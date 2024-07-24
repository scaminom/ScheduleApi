import { ApiProperty } from '@nestjs/swagger'
import { Prisma, Role } from '@prisma/client'
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator'

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ example: '0202020202', description: 'The CI of the user' })
  @IsNumberString({ no_symbols: true }, { message: 'CI must be a number' })
  ci: string

  @ApiProperty({ example: '#FFFFFF', description: 'The color of the user' })
  @IsOptional()
  @IsString()
  color?: string

  @ApiProperty({ example: 'passW0rd', description: 'The password of the user' })
  @IsString()
  password: string

  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    enumName: 'Role',
    example: Role.ADMIN,
    description: 'The role of the user',
  })
  role: Role

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  firstName: string

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  lastName: string
}
