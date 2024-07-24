import { ApiProperty } from '@nestjs/swagger'
import { IReminderFilters } from '../interfaces/i-reminder-filters'
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class ReminderFiltersDto implements IReminderFilters {
  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  color?: string

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt?: Date

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
    type: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  notificationSent?: boolean
}
