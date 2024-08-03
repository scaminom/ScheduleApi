import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { APPOINTMENT_STATUS, Inspection, Prisma } from '@prisma/client'
import { AppointmentsService } from '../appointments/appointments.service'
import { JobAlreadyExitsException } from '../jobs/exceptions'
import { PrismaService } from '../prisma/prisma.service'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import {
  InspectionNotFoundException,
  InspectionPastDateException,
} from './exceptions'
import { IInspectionFilters } from './interfaces/i-inspection-filters'
import { UserSelectInput } from 'src/shared/constants/user-select'
import { InspectionsGateway } from './inspections.gateway'

/*
 *
 */
@Injectable()
export class InspectionsService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => AppointmentsService))
    private readonly appointmentService: AppointmentsService,

    private readonly inspectionsGateway: InspectionsGateway,
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
            user: UserSelectInput,
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
            user: UserSelectInput,
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
      appointment: {
        deletedAt: null,
      },
    }

    return await this.prismaService.inspection.findMany({
      where: whereOptions,
      include: {
        jobs: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        appointment: {
          include: {
            user: UserSelectInput,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
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

    const inspection = await this.prismaService.inspection.create({
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
            user: UserSelectInput,
          },
        },
      },
    })

    this.inspectionsGateway.broadcastInspectionCreation()

    return inspection
  }

  /**
   * Get all inspections
   * @returns {Promise<Inspection[]>} - The inspections found
   */
  async findAll() {
    return await this.prismaService.inspection.findMany({
      where: {
        appointment: {
          deletedAt: null,
        },
      },
      include: {
        jobs: true,
        appointment: {
          include: {
            user: UserSelectInput,
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

    if (updateInspectionDto.startDate < new Date()) {
      throw new InspectionPastDateException()
    }

    if (updateInspectionDto.status === APPOINTMENT_STATUS.COMPLETED) {
      const jobs = await this.prismaService.job.findMany({
        where: {
          inspectionId: id,
          status: APPOINTMENT_STATUS.PENDING,
        },
      })

      if (jobs.length > 0) {
        throw new ConflictException(
          'No se puede completar la inspección si hay trabajos pendientes',
        )
      }
    }

    const inspectionUpdate = await this.prismaService.inspection.update({
      where: {
        id,
      },
      data: {
        ...updateInspectionDto,
        endDate:
          updateInspectionDto.status &&
          updateInspectionDto.status === APPOINTMENT_STATUS.COMPLETED
            ? new Date()
            : undefined,
      },
      include: {
        jobs: true,
        appointment: {
          include: {
            user: UserSelectInput,
          },
        },
      },
    })

    this.inspectionsGateway.broadcastInspectionUpdate()

    return inspectionUpdate
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

    const inspectionRemoved = await this.prismaService.inspection.delete({
      where: {
        id,
      },
    })

    this.inspectionsGateway.broadcastInspectionDeletion()

    return inspectionRemoved
  }
}
