import { forwardRef, Inject } from '@nestjs/common'
import { CreateAppointmentDto } from '../dto/create-appointment.dto'
import { AppointmentPastDateException } from '../exceptions/appointment-past-date'
import { AppointmentLaboralHoursException } from '../exceptions/appointment-laboral-hours'
import { AppointmentsService } from '../appointments.service'
import { AppointmentAlreadyExitsException } from '../exceptions/appointment-already-exists'
import { AppointmentLimitPerHourException } from '../exceptions/appointment-limit-per-hour'
import { BaseException } from '../../shared/exceptions/base-exception'
import { BaseConflictException } from '../../shared/exceptions/conflict'
import { UpdateAppointmentDto } from '../dto/update-appointment.dto'
import { UserService } from '../../users/users.service'
import { toEsEcDate } from '../../shared/functions/local-date'

export class AppoitmentValidator {
  constructor(
    @Inject(forwardRef(() => AppointmentsService))
    private readonly appointmentsService: AppointmentsService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  public async validate(
    createAppointmentDto: CreateAppointmentDto | UpdateAppointmentDto,
  ): Promise<void> {
    try {
      if (createAppointmentDto.date)
        this.validateDateAndTime(createAppointmentDto.date)

      if (createAppointmentDto.userCI)
        await this.validateMechanic(
          createAppointmentDto.userCI,
          createAppointmentDto.date,
        )

      if (createAppointmentDto.date)
        await this.validateAppointmentLimit(createAppointmentDto.date)
    } catch (error) {
      if (error instanceof BaseException) {
        throw error
      }

      throw new BaseConflictException('Error al validar la cita', error)
    }
  }

  private validateDateAndTime(date: Date): void {
    const dateCopy = toEsEcDate(new Date(date))
    if (dateCopy < new Date()) {
      throw new AppointmentPastDateException()
    }
    if (dateCopy.getHours() < 8 || dateCopy.getHours() > 17) {
      throw new AppointmentLaboralHoursException()
    }
  }

  private async validateMechanic(
    mechanicCI: string,
    date: Date,
  ): Promise<void> {
    await this.userService.findOne(mechanicCI)

    const dateCopy = new Date(date)
    const minutesRange = [0, 30]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minute <= minutesOfDate)
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const alreadyHasAppointment = await this.appointmentsService.appointments({
      where: {
        userCI: mechanicCI,
        date: {
          lte: new Date(dateCopy.getTime() + 30 * 60 * 1000),
          gte: dateCopy,
        },
        deletedAt: null,
      },
    })

    if (alreadyHasAppointment.length >= 1) {
      throw new AppointmentAlreadyExitsException(mechanicCI)
    }
  }

  private async validateAppointmentLimit(date: Date): Promise<void> {
    const dateCopy = new Date(date)
    const minutesRange = [0, 30]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minute <= minutesOfDate)
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const mechanics = await this.userService.users({
      where: {
        role: 'MECHANIC',
      },
    })

    const appointments = await this.appointmentsService.appointments({
      where: {
        date: {
          lte: new Date(dateCopy.getTime() + 20 * 60 * 1000),
          gte: dateCopy,
        },
        deletedAt: null,
      },
    })

    if (appointments.length >= mechanics.length) {
      throw new AppointmentLimitPerHourException()
    }
  }
}
