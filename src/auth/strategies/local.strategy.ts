import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { IResponseUser } from 'src/users/dto/response-user.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'ci',
    })
  }

  async validate(ci: string, password: string): Promise<IResponseUser> {
    const user = await this.authService.validateUser(ci, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
