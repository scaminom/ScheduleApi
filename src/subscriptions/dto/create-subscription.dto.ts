import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsString } from 'class-validator'

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 'adgyw-12afdywu09_da8w',
  })
  @IsString()
  token: string

  @ApiProperty({ example: '0202020202' })
  @IsNumberString()
  userCI: string
}
