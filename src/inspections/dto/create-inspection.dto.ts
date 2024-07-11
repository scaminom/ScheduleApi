import { ApiProperty } from '@nestjs/swagger'
import { APPOINTMENT_STATUS } from '@prisma/client'
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator'

export class CreateInspectionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  appointmentId: number

  @ApiProperty({ example: 'PENDING', enum: APPOINTMENT_STATUS })
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS

  @ApiProperty({ example: ['job1', 'job2'] })
  @IsOptional()
  @IsArray({
    each: true,
    context: { each: 'Debe ser una cadena de texto' },
  })
  jobs?: string[]

  @ApiProperty({ example: '2021-08-01T00:00:00' })
  @IsDate()
  startDate: Date

  @ApiProperty({ example: '2021-08-01T00:00:00' })
  @IsDate()
  endDate: Date
}
