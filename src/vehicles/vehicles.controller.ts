import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { VehiclesService } from './vehicles.service'
import { CreateVehicleDto } from './dto/create-vehicle.dto'
import { UpdateVehicleDto } from './dto/update-vehicle.dto'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiBody({
    type: CreateVehicleDto,
    description: 'The vehicle to create',
    required: true,
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto)
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll({})
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the vehicle',
    example: 1,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id)
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the vehicle',
    example: 1,
    required: true,
  })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the vehicle',
    example: 1,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id)
  }
}
