import { ApiProperty } from '@nestjs/swagger'
import { APPOINTMENT_STATUS, Prisma } from '@prisma/client'
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto
  implements Omit<Prisma.AppointmentCreateInput, 'user' | 'vehicle'>
{
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  clientName: string

  @ApiProperty({ example: 'MAZDA - BLANCO - PWQ-2394' })
  @IsString()
  vehicleDescription: string

  @ApiProperty({ example: 'Inspection description' })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: '2021-08-01T00:00:00' })
  @IsDate()
  date: Date

  @ApiProperty({ example: 'PENDING' })
  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS

  @ApiProperty({ example: '1' })
  @IsString()
  userCI: string
}