import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { JobsService } from './jobs.service'
import { CreateJobDto } from './dto/create-job.dto'
import { UpdateJobDto } from './dto/update-job.dto'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiBody({ type: CreateJobDto })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs.' })
  findAll() {
    return this.jobsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by ID' })
  @ApiParam({ name: 'id', description: 'Job ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'The job details.' })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a job' })
  @ApiParam({ name: 'id', description: 'Job ID', type: 'integer' })
  @ApiBody({ type: UpdateJobDto })
  @ApiResponse({
    status: 200,
    description: 'The job has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job' })
  @ApiParam({ name: 'id', description: 'Job ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'The job has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Job not found.' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id)
  }
}
