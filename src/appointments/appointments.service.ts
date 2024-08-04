import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { APPOINTMENT_STATUS, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { AppointmentNotFoundException } from './exceptions'
import { AppointmentsGateway } from './appointments.gateway'
import { InspectionsService } from 'src/inspections/inspections.service'
import { IAppointmentFilters } from './interfaces/i-appointment-filters'
import { IAppointmentWithUser } from './interfaces/i-appointment-with-user'
import { UserSelectInput } from 'src/shared/constants/user-select'
import { InspectionsGateway } from '../inspections/inspections.gateway'

@Injectable()
/**
 * AppointmentsService, each appointment has a max duration of 30 minutes.
 * if there are no mechanics available, throw an exception with the message "No mechanics available",
 * validadte date and time, if the date and time are in the past, throw an exception with the message "Date and time must be in the future",
 * if the date and time are not in the range of 8:00 to 17:00, throw an exception with the message "Date and time must be in the range of 8:00 to 17:00"
 */
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,

    @Inject(forwardRef(() => AppoitmentValidator))
    private readonly validateAppointment: AppoitmentValidator,

    @Inject(forwardRef(() => InspectionsService))
    private readonly inspectionsService: InspectionsService,

    private readonly appointmentsGateway: AppointmentsGateway,
    private readonly inspectionsGateway: InspectionsGateway,
  ) {}

  /**
   * Get an appointment
   * @param appointmentWhereUniqueInput Prisma.AppointmentWhereUniqueInput
   * @returns Promise<Appointment | null>
   * @throws Error if the appointment does not exist
   * @throws Error if the appointment is already deleted
   */
  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<IAppointmentWithUser | null> {
    return await this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: {
        user: UserSelectInput,
      },
    })
  }

  /**
   * Get appointments
   * @param params { skip?: number, take?: number, cursor?: Prisma.AppointmentWhereUniqueInput, where?: Prisma.AppointmentWhereInput }
   * @returns Promise<Appointment[]>
   */
  async appointments(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AppointmentWhereUniqueInput
    where?: Prisma.AppointmentWhereInput
  }) {
    return await this.prisma.appointment.findMany({
      ...params,
      include: {
        user: UserSelectInput,
      },
    })
  }

  /**
   * Find appointments by filters
   * @param params IAppointementFilters
   * @returns Promise<Appointment[]>
   * @throws {ConflictException} if the start date is greater than the end date
   */
  async findByFilters(
    params: IAppointmentFilters,
  ): Promise<IAppointmentWithUser[]> {
    if (
      params.startDate &&
      params.endDate &&
      params.startDate > params.endDate
    ) {
      throw new ConflictException(
        'Fecha de inicio no puede ser mayor a la fecha de fin',
      )
    }

    const { startDate, endDate, date, ...rest } = params

    const whereOptions: Prisma.AppointmentWhereInput = {
      ...rest,
      date: params.date
        ? new Date(date)
        : params.startDate && params.endDate
          ? {
              lte: new Date(endDate),
              gte: new Date(startDate),
            }
          : params.startDate
            ? { gte: new Date(startDate) }
            : params.endDate
              ? { lte: new Date(endDate) }
              : undefined,
      deletedAt: null,
    }

    return await this.prisma.appointment.findMany({
      where: whereOptions,
      include: {
        user: UserSelectInput,
      },
      orderBy: {
        date: 'asc',
      },
    })
  }

  /**
   * Create a new appointment, validate the appointment
   * @param createApointmentDto CreateAppointmentDto
   * @returns Promise<Appointment>
   * @throws Error if the appointment is invalid
   */
  async create(
    createApointmentDto: CreateAppointmentDto,
  ): Promise<IAppointmentWithUser> {
    await this.validateAppointment.validate(createApointmentDto)

    const appointment = await this.prisma.appointment.create({
      data: {
        ...createApointmentDto,
      },
      include: {
        user: UserSelectInput,
      },
    })

    await this.inspectionsService.create({
      appointmentId: appointment.id,
      status: APPOINTMENT_STATUS.PENDING,
      startDate: createApointmentDto.date,
    })

    this.appointmentsGateway.broadcastAppointmentCreation(appointment)

    return appointment
  }

  /**
   * Get all appointments
   * @returns Promise<Appointment[]>
   */
  async findAll() {
    return await this.prisma.appointment.findMany({
      include: {
        user: UserSelectInput,
      },
      where: {
        deletedAt: null,
      },
    })
  }

  /**
   * Find an appointment by id
   * @param id number
   * @returns Promise<Appointment>
   * @throws {AppointmentNotFoundException} if the appointment does not exist
   */
  async findOne(id: number) {
    const appointment = await this.appointment({ id })

    if (!appointment) {
      throw new AppointmentNotFoundException(id)
    }

    return appointment
  }

  /**
   * Update an appointment
   * @param id number
   * @param updateApointmentDto UpdateAppointmentDto
   * @returns Promise<Appointment>
   * @throws Error if the appointment is invalid
   * @throws Error if the appointment does not exist
   * @throws Error if the appointment is already deletedk
   */
  async update(id: number, updateApointmentDto: UpdateAppointmentDto) {
    await this.findOne(id)

    await this.validateAppointment.validate(updateApointmentDto)

    const appointment = await this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...updateApointmentDto,
      },
      include: {
        user: UserSelectInput,
      },
    })

    this.appointmentsGateway.broadcastAppointmentUpdate(appointment)
    this.inspectionsGateway.broadcastInspectionUpdate()
    return appointment
  }

  /**
   * Remove an appointment
   * @param id number
   * @returns Promise<Appointment>
   * @throws Error if the appointment does not exist
   * @throws Error if the appointment is already deleted
   */
  async remove(id: number): Promise<IAppointmentWithUser> {
    const appointment = await this.findOne(id)

    if (!appointment) {
      throw new AppointmentNotFoundException(id)
    }

    const deletedAppointment = await this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        user: UserSelectInput,
      },
    })

    this.appointmentsGateway.broadcastAppointmentDeletion(deletedAppointment)
    this.inspectionsGateway.broadcastInspectionDeletion()

    return deletedAppointment
  }
}
