import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'

export class CreateVehicleDto implements Prisma.VehicleCreateInput {
  @IsString()
  plate: string

  @IsString()
  type: string

  @IsString()
  brand: string

  @IsString()
  model: string

  @IsString()
  color: string
}
