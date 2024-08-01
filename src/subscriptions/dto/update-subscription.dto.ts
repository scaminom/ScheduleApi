import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator'

export class UpdateSubscriptionDto {
  @ApiProperty({ example: '0202020202' })
  @IsOptional()
  @IsNumberString()
  userCI?: string

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  available: boolean
}
