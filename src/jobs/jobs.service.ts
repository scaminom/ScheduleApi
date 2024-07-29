import { Injectable } from '@nestjs/common'
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { InspectionsService } from 'src/inspections/inspections.service'
import { JobAlreadyExitsException } from './exceptions/job-already-exists'
import { Prisma } from '@prisma/client'
import { InspectionNotFoundException } from 'src/inspections/exceptions/inspection-not-found'
import { JobsGateway } from './jobs.gateway'

@Injectable()
/*
 * Each job has owned by a inspection, and each inspection has many jobs. Jobs can have different statuses, such as PENDING, IN_PROGRESS, and COMPLETED.
 * The jobs of an inspection can be created, read, updated, and deleted.
 * The jobs of an inspection should'nt have the same name.
 */
export class JobsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly inspectionsService: InspectionsService,
    private readonly jobsGateway: JobsGateway,
  ) {}

  /**
   * Get a job
   * @param {Prisma.JobWhereUniqueInput} params - Params to find the job
   * @returns {Promise<Job | null>} - The job found
   */
  async job(params: Prisma.JobWhereUniqueInput) {
    return await this.prismaService.job.findUnique({
      where: params,
    })
  }

  /**
   * Get jobs
   * @param {{ skip?: number, take?: number, cursor?: Prisma.JobWhereUniqueInput, where?: Prisma.JobWhereInput }} params - Params to find the jobs
   * @returns {Promise<Job[]>} - The jobs found
   */
  async jobs(params: {
    skip?: number
    take?: number
    cursor?: Prisma.JobWhereUniqueInput
    where?: Prisma.JobWhereInput
  }) {
    return await this.prismaService.job.findMany({
      ...params,
    })
  }

  /**
   * Create a new job
   * @param {CreateJobDto} createJobDto - The job data
   * @returns {Promise<Job>} - The job created
   * @throws {JobAlreadyExitsException} - If the job already exists
   * @throws {InspectionNotFoundException} - If the inspection does not exist
   */
  async create(createJobDto: CreateJobDto) {
    await this.inspectionsService.findOne(createJobDto.inspectionId)

    const jobs = await this.prismaService.job.findMany({
      where: {
        inspectionId: createJobDto.inspectionId,
        name: createJobDto.name,
      },
    })

    if (jobs.length > 0) {
      throw new JobAlreadyExitsException(createJobDto.inspectionId)
    }

    const job = await this.prismaService.job.create({
      data: createJobDto,
    })

    this.jobsGateway.broadcastJobCreation()

    return job
  }

  /**
   * Find all jobs
   * @returns {Promise<Job[]>} - The jobs found
   */
  async findAll() {
    return await this.prismaService.job.findMany()
  }

  /**
   * Find a job by id
   * @param {number} id - The job ID
   * @returns {Promise<Job>} - The job found
   */
  async findOne(id: number) {
    const job = await this.job({ id })

    if (!job) {
      throw new InspectionNotFoundException(id)
    }

    return job
  }

  /**
   * Update a job
   * @param {number} id - The job ID
   * @param {UpdateJobDto} updateJobDto - The job data
   * @returns {Promise<Job>} - The job updated
   */
  async update(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.job({ id })

    if (!job) {
      throw new InspectionNotFoundException(id)
    }

    const jobs = await this.prismaService.job.findMany({
      where: {
        inspectionId: updateJobDto.inspectionId,
        name: updateJobDto.name,
      },
    })

    if (jobs.length > 0) {
      throw new JobAlreadyExitsException(updateJobDto.inspectionId)
    }

    const updatedJob = await this.prismaService.job.update({
      where: {
        id,
      },
      data: updateJobDto,
    })

    this.jobsGateway.broadcastJobUpdate()

    return updatedJob
  }

  /**
   * Remove a job
   * @param {number} id - The job ID
   * @returns {Promise<Job>} - The job removed
   */
  async remove(id: number) {
    await this.findOne(id)

    const deletedJob = await this.prismaService.job.delete({
      where: {
        id,
      },
    })

    this.jobsGateway.broadcastJobDeletion()

    return deletedJob
  }
}
