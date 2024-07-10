import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateInspectionDto } from './create-inspection.dto'

export class UpdateInspectionDto extends PartialType(
  OmitType(CreateInspectionDto, ['jobs']),
) {}
