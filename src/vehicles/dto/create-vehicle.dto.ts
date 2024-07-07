import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { IsString } from 'class-validator'

export class CreateVehicleDto implements Prisma.VehicleCreateInput {
  @ApiProperty({ example: 'ABC123', description: 'The plate of the vehicle' })
  @IsString()
  plate: string

  @ApiProperty({ example: 'Car', description: 'The type of the vehicle' })
  @IsString()
  type: string

  @ApiProperty({ example: 'Toyota', description: 'The brand of the vehicle' })
  @IsString()
  brand: string

  @ApiProperty({ example: 'Corolla', description: 'The model of the vehicle' })
  @IsString()
  model: string

  @ApiProperty({ example: 'White', description: 'The color of the vehicle' })
  @IsString()
  color: string
}
