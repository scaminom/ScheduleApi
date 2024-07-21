import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AppoitmentValidator } from './validators/CreateAppointmentValidator'
import { AppointmentNotFoundException } from './exceptions'
import { AppointmentsGateway } from './appointments.gateway'

@Injectable()
/**
 * AppointmentsService, each appointment has a max duration of 20 minutes, there are 3 mechanics available, so there can be 3 appointments at the same time,
 * if there are no mechanics available, throw an exception with the message "No mechanics available",
 * validadte date and time, if the date and time are in the past, throw an exception with the message "Date and time must be in the future",
 * if the date and time are not in the range of 8:00 to 17:00, throw an exception with the message "Date and time must be in the range of 8:00 to 17:00"
 */
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,

    @Inject(forwardRef(() => AppoitmentValidator))
    private readonly validateAppointment: AppoitmentValidator,
    private readonly appointmentsGateway: AppointmentsGateway,
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
  ): Promise<Appointment | null> {
    return await this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            ci: true,
            role: true,
          },
        },
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
        user: {
          select: {
            firstName: true,
            lastName: true,
            ci: true,
            role: true,
          },
        },
      },
    })
  }

  /**
   * Create a new appointment, validate the appointment
   * @param createApointmentDto CreateAppointmentDto
   * @returns Promise<Appointment>
   * @throws Error if the appointment is invalid
   */
  async create(createApointmentDto: CreateAppointmentDto) {
    await this.validateAppointment.validate(createApointmentDto)

    const appointment = await this.prisma.appointment.create({
      data: {
        ...createApointmentDto,
      },
    })

    this.appointmentsGateway.sendAppointmentToMechanics(appointment)

    return appointment
  }

  /**
   * Get all appointments
   * @returns Promise<Appointment[]>
   */
  async findAll() {
    return await this.prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            ci: true,
            role: true,
          },
        },
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

    return await this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...updateApointmentDto,
      },
    })
  }

  /**
   * Remove an appointment
   * @param id number
   * @returns Promise<Appointment>
   * @throws Error if the appointment does not exist
   * @throws Error if the appointment is already deleted
   */
  async remove(id: number) {
    const appointment = await this.findOne(id)

    if (!appointment) {
      throw new AppointmentNotFoundException(id)
    }

    return await this.prisma.appointment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
