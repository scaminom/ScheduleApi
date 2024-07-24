import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger'
import { CreateInspectionDto } from './create-inspection.dto'
import { IsDate } from 'class-validator'

export class UpdateInspectionDto extends PartialType(
  OmitType(CreateInspectionDto, ['jobs']),
) {
  @ApiProperty({ example: '2021-08-01T00:00:00' })
  @IsDate()
  endDate?: Date
}
