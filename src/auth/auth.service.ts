import {
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UserService } from '../users/users.service'
import { compareSync } from 'bcrypt'
import { IResponseUser } from 'src/users/dto/response-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private comparePassword(password: string, userPassword: string): boolean {
    return compareSync(password, userPassword)
  }

  async validateUser(ci: string, pass: string): Promise<IResponseUser | null> {
    const user = await this.userService.user({ ci })

    if (user && this.comparePassword(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signIn(ci: string, pass: string) {
    const user = await this.userService.user({ ci })

    if (!user) {
      throw new UnauthorizedException()
    }

    if (!this.comparePassword(pass, user.password)) {
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

  async logout(@Req() request: Request): Promise<any> {
    request['user'] = null
    return {
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    }
  }
}
