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
import { TokenResponse } from './dto/token-response.dto'

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
      throw new UnauthorizedException('Credenciales inválidas')
    }

    if (!this.comparePassword(pass, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas')
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

  validateToken(req: Request): TokenResponse {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return {
          isValid: false,
          message: 'Inicie sesión para continuar',
        }
      }

      const payload = this.jwtService.verify(token)

      if (!payload) {
        return {
          isValid: false,
          message: 'Token inválido',
        }
      }

      return { isValid: true }
    } catch (error) {
      return {
        isValid: false,
        message: 'Token inválido',
      }
    }
  }
}
