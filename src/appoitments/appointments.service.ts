import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AppoitmentValidator } from './validators/CreateAppoitmentValidator'

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
  ) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment | null> {
    return await this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: {
        vehicle: true,
        user: true,
      },
    })
  }

  async appointments(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AppointmentWhereUniqueInput
    where?: Prisma.AppointmentWhereInput
  }) {
    return await this.prisma.appointment.findMany({
      ...params,
      include: {
        vehicle: true,
        user: true,
      },
    })
  }

  async create(createApointmentDto: CreateAppointmentDto) {
    await this.validateAppointment.validate(createApointmentDto)

    return await this.prisma.appointment.create({
      data: {
        ...createApointmentDto,
      },
    })
  }

  async findAll() {
    return await this.prisma.appointment.findMany({
      include: {
        vehicle: true,
        user: true,
      },
      where: {
        deletedAt: null,
      },
    })
  }

  async findOne(id: number) {
    return await this.prisma.appointment.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateApointmentDto: UpdateAppointmentDto) {
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

  async remove(id: number) {
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