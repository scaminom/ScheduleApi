import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly apointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createApointmentDto: CreateAppointmentDto) {
    return this.apointmentsService.create(createApointmentDto)
  }

  @Get()
  findAll() {
    return this.apointmentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apointmentsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApointmentDto: UpdateAppointmentDto,
  ) {
    return this.apointmentsService.update(+id, updateApointmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apointmentsService.remove(+id)
  }
}
