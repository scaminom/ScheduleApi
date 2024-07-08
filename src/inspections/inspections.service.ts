import { Injectable } from '@nestjs/common'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { APOITMENT_STATUS, Inspection, Prisma } from '@prisma/client'
import { InspectionPastDateException } from './exceptions/inspection-past-date'
import { AppointmentsService } from 'src/appoitments/appointments.service'
import { InspectionNotFoundException } from './exceptions/inspection-not-found'

/*
 *
 */
@Injectable()
export class InspectionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async inspection(
    params: Prisma.InspectionWhereUniqueInput,
  ): Promise<Inspection | null> {
    return await this.prismaService.inspection.findUnique({
      where: params,
    })
  }

  async inspections(params: {
    skip?: number
    take?: number
    cursor?: Prisma.InspectionWhereUniqueInput
    where?: Prisma.InspectionWhereInput
  }) {
    return await this.prismaService.inspection.findMany({
      ...params,
    })
  }

  async create(createInspectionDto: CreateInspectionDto) {
    const { appointmentId, jobs, startDate, endDate } = createInspectionDto

    const pastInspection = await this.prismaService.inspection.findFirst({
      where: {
        appointmentId,
        startDate: {
          lte: startDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    })

    if (pastInspection) {
      throw new InspectionPastDateException()
    }

    await this.appointmentService.findOne(appointmentId)

    return await this.prismaService.inspection.create({
      data: {
        appointmentId,
        jobs: {
          create: jobs.map((job) => ({
            name: job,
            status: APOITMENT_STATUS.PENDING,
          })),
        },
        startDate,
        endDate,
        status: APOITMENT_STATUS.PENDING,
      },
    })
  }

  async findAll() {
    return await this.prismaService.inspection.findMany()
  }

  async findOne(id: number) {
    const inspection = await this.inspection({ id })

    if (!inspection) {
      throw new InspectionNotFoundException(id)
    }

    return inspection
  }

  async update(id: number, updateInspectionDto: UpdateInspectionDto) {
    const { jobs, startDate, endDate } = updateInspectionDto

    await this.appointmentService.findOne(id)

    const pastInspection = await this.prismaService.inspection.findFirst({
      where: {
        appointmentId: id,
        startDate: {
          lte: startDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    })

    if (pastInspection) {
      throw new InspectionPastDateException()
    }

    return await this.prismaService.inspection.update({
      where: {
        id,
      },
      data: {
        jobs: {
          create: jobs.map((job) => ({
            name: job,
            status: APOITMENT_STATUS.PENDING,
          })),
        },
        startDate,
        endDate,
        status: APOITMENT_STATUS.PENDING,
      },
    })
  }

  async remove(id: number) {
    const inspection = await this.inspection({ id })

    if (!inspection) {
      throw new InspectionNotFoundException(id)
    }

    return await this.prismaService.inspection.delete({
      where: {
        id,
      },
    })
  }
}
