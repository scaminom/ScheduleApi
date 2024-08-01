import { ApiProperty } from '@nestjs/swagger'
import { APPOINTMENT_STATUS } from '@prisma/client'
import { IsDate, IsEnum, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'
import { IInspectionFilters } from '../interfaces/i-inspection-filters'

export class InspectionFiltersDto implements IInspectionFilters {
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
    enum: APPOINTMENT_STATUS,
  })
  @IsOptional()
  @IsEnum(APPOINTMENT_STATUS)
  status?: APPOINTMENT_STATUS
}
