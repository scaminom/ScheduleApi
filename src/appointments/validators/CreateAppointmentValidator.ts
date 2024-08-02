import { forwardRef, Inject, Logger } from '@nestjs/common'
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
  private readonly logger: Logger = new Logger('AppoitmentValidator')
  constructor(
    @Inject(forwardRef(() => AppointmentsService))
    private readonly appointmentsService: AppointmentsService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  public async validate(
    handleAppointmentDto: CreateAppointmentDto | UpdateAppointmentDto,
  ): Promise<void> {
    try {
      if (handleAppointmentDto.date)
        this.validateDateAndTime(handleAppointmentDto.date)

      if (handleAppointmentDto.userCI)
        await this.validateMechanic(
          handleAppointmentDto.userCI,
          handleAppointmentDto.date,
        )

      if (handleAppointmentDto.date)
        await this.validateAppointmentLimit(handleAppointmentDto.date)
    } catch (error) {
      if (error instanceof BaseException) {
        throw error
      }

      this.logger.error(error)
      throw new BaseConflictException('Error al validar la cita', error)
    }
  }

  private validateDateAndTime(date: Date): void {
    const dateCopy = toEsEcDate(new Date(date))

    if (dateCopy < toEsEcDate(new Date())) {
      throw new AppointmentPastDateException()
    }
    if (dateCopy.getHours() < 8 || dateCopy.getHours() > 17) {
      throw new AppointmentLaboralHoursException()
    }
  }

  private async validateMechanic(
    mechanicCI: string,
    date?: Date,
  ): Promise<void> {
    await this.userService.findOne(mechanicCI)

    if (!date) {
      return
    }

    const dateCopy = new Date(date)
    const minutesRange = [0, 30]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minutesOfDate <= minute)
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const alreadyHasAppointment = await this.appointmentsService.appointments({
      where: {
        userCI: mechanicCI,
        date: {
          lt: new Date(dateCopy.getTime() + 30 * 60 * 1000),
          gte: new Date(dateCopy),
        },
        deletedAt: null,
      },
    })

    if (alreadyHasAppointment.length >= 1) {
      throw new AppointmentAlreadyExitsException(mechanicCI)
    }
  }

  private async validateAppointmentLimit(date: Date): Promise<void> {
    const dateCopy = toEsEcDate(new Date(date))
    const minutesRange = [0, 30]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minutesOfDate <= minute) ?? 0
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const mechanics = await this.userService.users({
      where: {
        role: 'MECHANIC',
        deletedAt: null,
      },
    })

    const startTime = toEsEcDate(new Date(dateCopy))
    const endTime = toEsEcDate(new Date(dateCopy))
    endTime.setMinutes(startTime.getMinutes() + 30)

    const appointments = await this.appointmentsService.appointments({
      where: {
        date: {
          lt: endTime,
          gte: startTime,
        },
        deletedAt: null,
      },
    })

    if (appointments.length >= mechanics.length) {
      throw new AppointmentLimitPerHourException(mechanics.length)
    }
  }
}
