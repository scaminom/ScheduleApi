import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ example: '0202020202', description: 'The CI of the user' })
  @IsString()
  ci: string

  @ApiProperty({ example: 'passW0rd', description: 'The password of the user' })
  @IsString()
  password: string
}
