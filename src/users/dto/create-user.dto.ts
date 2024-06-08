import { Prisma, Role } from '@prisma/client';
import { IsEnum, IsNumberString, IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNumberString()
  ci: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
