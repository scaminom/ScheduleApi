import { ApiProperty } from '@nestjs/swagger'
import { APPOITMENT_STATUS } from '@prisma/client'
import { IsEnum, IsNumber, IsString } from 'class-validator'

export class CreateJobDto {
  @ApiProperty({
    description: 'The ID of the inspection',
    example: 1,
    required: true,
  })
  @IsNumber()
  inspectionId: number

  @ApiProperty({
    description: 'The name of the job',
    example: 'Cambio de aceite',
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'The status of the job',
    example: 'PENDING',
    required: true,
  })
  @IsEnum(APPOITMENT_STATUS)
  status: APPOITMENT_STATUS
}
