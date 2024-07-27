import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { InspectionsService } from './inspections.service'
import { CreateInspectionDto } from './dto/create-inspection.dto'
import { UpdateInspectionDto } from './dto/update-inspection.dto'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { IInspectionFilters } from './interfaces/i-inspection-filters'
import { InspectionFiltersDto } from './dto/appointment-filters.dto'

@ApiTags('inspections')
@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inspection' })
  @ApiBody({ type: CreateInspectionDto })
  @ApiResponse({
    status: 201,
    description: 'The inspection has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createInspectionDto: CreateInspectionDto) {
    return this.inspectionsService.create(createInspectionDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all inspections by filters' })
  @ApiResponse({ status: 200, description: 'List of inspections.' })
  @ApiQuery({ type: InspectionFiltersDto })
  findByFilters(
    @Query()
    filters: IInspectionFilters,
  ) {
    return this.inspectionsService.findByFilters(filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a inspection by ID' })
  @ApiParam({ name: 'id', description: 'Inspection ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'The inspection details.' })
  @ApiResponse({ status: 404, description: 'Inspection not found.' })
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a inspection' })
  @ApiParam({ name: 'id', description: 'Inspection ID', type: 'integer' })
  @ApiBody({ type: UpdateInspectionDto })
  @ApiResponse({
    status: 200,
    description: 'The inspection has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Inspection not found.' })
  @ApiResponse({ status: 409, description: 'Inspection date conflict.' })
  update(
    @Param('id') id: string,
    @Body() updateInspectionDto: UpdateInspectionDto,
  ) {
    return this.inspectionsService.update(+id, updateInspectionDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a inspection' })
  @ApiParam({ name: 'id', description: 'Inspection ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'The inspection has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Inspection not found.' })
  remove(@Param('id') id: string) {
    return this.inspectionsService.remove(+id)
  }
}
