import { Injectable } from '@nestjs/common'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import { PrismaService } from '../prisma/prisma.service'
import { APPOITMENT_STATUS, Inspection, Prisma } from '@prisma/client'
import { AppointmentsService } from '../appoitments/appointments.service'
import {
  InspectionNotFoundException,
  InspectionPastDateException,
} from './exceptions'
import { JobAlreadyExitsException } from '../jobs/exceptions'

/*
 *
 */
@Injectable()
export class InspectionsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  /**
   * Find an inspection by params
   * @param {Prisma.InspectionWhereUniqueInput} params - Params to find the inspection
   * @returns {Promise<Inspection | null>} - The inspection found
   */
  async inspection(
    params: Prisma.InspectionWhereUniqueInput,
  ): Promise<Inspection | null> {
    return await this.prismaService.inspection.findUnique({
      where: params,
    })
  }

  /**
   * Find inspections by params
   * @param {{ skip?: number, take?: number, cursor?: Prisma.InspectionWhereUniqueInput, where?: Prisma.InspectionWhereInput }} params - Params to find the inspections
   * @returns {Promise<Inspection[]>} - The inspections found
   */
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

  /**
   * Create a new inspection
   * @param {CreateInspectionDto} createInspectionDto - The inspection data
   * @returns {Promise<Inspection>} - The inspection created
   * @throws {InspectionPastDateException} - If the inspection has a past date
   * @throws {Error} - If the jobs have the same name
   * @throws {Error} - If the appointment does not exist
   */
  async create(createInspectionDto: CreateInspectionDto) {
    const { appointmentId, jobs, startDate, endDate } = createInspectionDto

    await this.appointmentService.findOne(appointmentId)

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
    // find jobs with the same name
    if (jobs) {
      const jobNames = jobs.map((job) => job.toLowerCase())
      const jobNamesSet = new Set(jobNames)
      if (jobNames.length !== jobNamesSet.size) {
        throw new JobAlreadyExitsException()
      }
    }

    return await this.prismaService.inspection.create({
      data: {
        appointmentId,
        jobs:
          jobs != null && jobs.length > 0
            ? {
                create: jobs.map((job) => ({
                  name: job,
                  status: APPOITMENT_STATUS.PENDING,
                })),
              }
            : undefined,
        startDate,
        endDate,
        status: APPOITMENT_STATUS.PENDING,
      },
    })
  }

  /**
   * Get all inspections
   * @returns {Promise<Inspection[]>} - The inspections found
   */
  async findAll() {
    return await this.prismaService.inspection.findMany()
  }

  /**
   * Find an inspection by id
   * @param {number} id - The id of the inspection
   * @returns {Promise<Inspection>} - The inspection found
   * @throws {InspectionNotFoundException} - If the inspection does not exist
   */
  async findOne(id: number) {
    const inspection = await this.inspection({ id })

    if (!inspection) {
      throw new InspectionNotFoundException(id)
    }

    return inspection
  }

  /**
   * Update an inspection
   * @param {number} id - The id of the inspection
   * @param {UpdateInspectionDto} updateInspectionDto - The inspection data to update
   * @returns {Promise<Inspection>} - The inspection updated
   * @throws {InspectionPastDateException} - If the inspection has a past date
   * @throws {Error} - If the jobs have the same name
   */
  async update(id: number, updateInspectionDto: UpdateInspectionDto) {
    const { startDate, endDate } = updateInspectionDto

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
        startDate,
        endDate,
        status: APPOITMENT_STATUS.PENDING,
      },
    })
  }

  /**
   * Remove an inspection
   * @param {number} id - The id of the inspection
   * @returns {Promise<Inspection>} - The inspection removed
   * @throws {InspectionNotFoundException} - If the inspection does not exist
   */
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
