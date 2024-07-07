import { APOITMENT_STATUS, Prisma } from '@prisma/client'
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto
  implements Omit<Prisma.AppointmentCreateInput, 'user' | 'vehicle'>
{
  @IsString()
  clientName: string

  @IsNumber()
  vehicleId: number

  @IsString()
  @IsOptional()
  description?: string

  @IsDate()
  date: Date

  @IsEnum(APOITMENT_STATUS)
  status: APOITMENT_STATUS

  @IsString()
  userId: string
}
