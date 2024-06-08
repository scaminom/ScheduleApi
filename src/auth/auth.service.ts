import {
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(ci: string, pass) {
    const user = await this.userService.user({ ci })
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.ci, firstName: user.firstName }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signUp(payload: CreateUserDto) {
    const user = await this.userService.createUser(payload)
    return user
  }

  async validateUser(ci: string, pass: string): Promise<any> {
    const user = await this.userService.user({ ci })
    if (user && user.password === pass) {
      return user
    }
    return null
  }

  async logout(@Req() request: Request): Promise<any> {
    request['user'] = null
    return {
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    }
  }
}
