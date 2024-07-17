import { forwardRef, Inject } from '@nestjs/common'
import { VehiclesService } from '../../vehicles/vehicles.service'
import { CreateAppointmentDto } from '../dto/create-appointment.dto'
import { VehicleNotFoundException } from '../../vehicles/exceptions/vehicle-not-found'
import { AppointmentPastDateException } from '../exceptions/appointment-past-date'
import { AppointmentLaboralHoursException } from '../exceptions/appointment-laboral-hours'
import { AppointmentsService } from '../appointments.service'
import { AppointmentAlreadyExitsException } from '../exceptions/appointment-already-exists'
import { AppointmentLimitPerHourException } from '../exceptions/appointment-limit-per-hour'
import { BaseException } from '../../shared/exceptions/base-exception'
import { BaseConflictException } from '../../shared/exceptions/conflict'
import { UpdateAppointmentDto } from '../dto/update-appointment.dto'

export class AppoitmentValidator {
  constructor(
    @Inject(VehiclesService)
    private readonly vehiclesService: VehiclesService,

    @Inject(forwardRef(() => AppointmentsService))
    private readonly appointmentsService: AppointmentsService,
  ) {}

  public async validate(
    createAppointmentDto: CreateAppointmentDto | UpdateAppointmentDto,
  ): Promise<void> {
    try {
      await this.validateVehicleId(createAppointmentDto.vehicleId)
      this.validateDateAndTime(createAppointmentDto.date)

      await this.validateMechanic(
        createAppointmentDto.userId,
        createAppointmentDto.date,
      )
      await this.validateAppointmentLimit(createAppointmentDto.date)
    } catch (error) {
      if (error instanceof BaseException) {
        throw error
      }

      throw new BaseConflictException('Error al validar la cita', error)
    }
  }

  private async validateVehicleId(vehicleId: number): Promise<void> {
    const vehicle = await this.vehiclesService.findOne(vehicleId)

    if (!vehicle) {
      throw new VehicleNotFoundException(vehicleId)
    }
  }

  private validateDateAndTime(date: Date): void {
    if (date < new Date()) {
      throw new AppointmentPastDateException()
    }
    if (date.getHours() < 8 || date.getHours() > 17) {
      throw new AppointmentLaboralHoursException()
    }
  }

  private async validateMechanic(
    mechanicCI: string,
    date: Date,
  ): Promise<void> {
    const dateCopy = new Date(date)
    const minutesRange = [0, 20, 40]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minute <= minutesOfDate)
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const alreadyHasAppointment = await this.appointmentsService.appointments({
      where: {
        userId: mechanicCI,
        date: {
          lte: new Date(dateCopy.getTime() + 20 * 60 * 1000),
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
    const minutesRange = [0, 20, 40]
    const minutesOfDate = dateCopy.getMinutes()
    const minutes = minutesRange.find((minute) => minute <= minutesOfDate)
    dateCopy.setMinutes(minutes)
    dateCopy.setSeconds(0)

    const appointments = await this.appointmentsService.appointments({
      where: {
        date: {
          lte: new Date(dateCopy.getTime() + 20 * 60 * 1000),
          gte: dateCopy,
        },
        deletedAt: null,
      },
    })

    if (appointments.length >= 3) {
      throw new AppointmentLimitPerHourException()
    }
  }
}
