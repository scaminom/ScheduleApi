import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import { PrismaService } from '../prisma/prisma.service'
import { APPOINTMENT_STATUS, Inspection, Prisma } from '@prisma/client'
import { AppointmentsService } from '../appointments/appointments.service'
import {
  InspectionNotFoundException,
  InspectionPastDateException,
} from './exceptions'
import { JobAlreadyExitsException } from '../jobs/exceptions'
import { IInspectionFilters } from './interfaces/i-inspection-filters'

/*
 *
 */
@Injectable()
export class InspectionsService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => AppointmentsService))
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
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
      },
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
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
      },
    })
  }

  /**
   * Find inspections by filters
   * @param {IInspectionFilters} params - The filters to find the inspections
   * @returns {Promise<Inspection[]>} - The inspections found
   * @throws {ConflictException} - If the start date is greater than the end date
   */
  async findByFilters(params: IInspectionFilters) {
    if (
      params.startDate &&
      params.endDate &&
      params.startDate > params.endDate
    ) {
      throw new ConflictException(
        'Fecha de inicio no puede ser mayor a la fecha de fin',
      )
    }

    const { startDate, endDate, ...rest } = params

    const whereOptions: Prisma.InspectionWhereInput = {
      ...rest,
      startDate:
        params.startDate && params.endDate
          ? {
              lte: new Date(endDate),
              gte: new Date(startDate),
            }
          : params.startDate
            ? { gte: new Date(startDate) }
            : params.endDate
              ? { lte: new Date(endDate) }
              : undefined,
    }

    return await this.prismaService.inspection.findMany({
      where: whereOptions,
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
      },
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
    const { appointmentId, jobs, startDate } = createInspectionDto

    await this.appointmentService.findOne(appointmentId)

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
                  status: APPOINTMENT_STATUS.PENDING,
                })),
              }
            : undefined,
        startDate,
        status: APPOINTMENT_STATUS.PENDING,
      },
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
      },
    })
  }

  /**
   * Get all inspections
   * @returns {Promise<Inspection[]>} - The inspections found
   */
  async findAll() {
    return await this.prismaService.inspection.findMany({
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
      },
    })
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
    await this.findOne(id)

    if (updateInspectionDto.appointmentId)
      await this.appointmentService.findOne(updateInspectionDto.appointmentId)

    if (
      updateInspectionDto.startDate < new Date() ||
      updateInspectionDto.endDate < new Date()
    ) {
      throw new InspectionPastDateException()
    }

    if (updateInspectionDto.endDate < updateInspectionDto.startDate) {
      throw new InspectionPastDateException()
    }

    return await this.prismaService.inspection.update({
      where: {
        id,
      },
      data: {
        ...updateInspectionDto,
      },
      include: {
        jobs: true,
        appointment: {
          include: {
            user: { select: { firstName: true, lastName: true, ci: true } },
          },
        },
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
