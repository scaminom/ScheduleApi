import { ApiProperty } from '@nestjs/swagger'
import { Prisma, Role } from '@prisma/client'
import { IsEnum, IsNumberString, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNumberString()
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
