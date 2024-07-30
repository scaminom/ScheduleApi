import { ApiProperty } from '@nestjs/swagger'
import { IAppointmentFilters } from '../interfaces/i-appointment-filters'
import { APPOINTMENT_STATUS } from '@prisma/client'
import {
  IsDate,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class AppointmentFiltersDto implements IAppointmentFilters {
  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startDate?: Date

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  endDate?: Date

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date?: Date

  @ApiProperty({
    required: false,
    type: 'string',
    enum: APPOINTMENT_STATUS,
  })
  @IsOptional()
  @IsEnum(APPOINTMENT_STATUS)
  status?: APPOINTMENT_STATUS

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsNumberString()
  userCI?: string

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  clientName?: string

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  vehicleDescription?: string
}
