import { ApiProperty } from '@nestjs/swagger'
import { Prisma, Role } from '@prisma/client'
import { IsEnum, IsNumberString, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNumberString({ no_symbols: true }, { message: 'CI must be a number' })
  ci: string

  @IsString()
  password: string

  @IsEnum(Role)
  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}
