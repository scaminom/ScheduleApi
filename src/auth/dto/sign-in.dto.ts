import { IsString } from 'class-validator'

export class SignInDto {
  @IsString()
  ci: string

  @IsString()
  password: string
}
