import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>()
    try {
      const user = await this.getUserFromSocket(client)
      context.switchToHttp().getRequest().user = user
      return true
    } catch (err) {
      throw new WsException('Unauthorized')
    }
  }

  async getUserFromSocket(socket: Socket) {
    const token = socket.handshake.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new WsException('Unauthorized: No token provided')
    }
    try {
      const payload = this.jwtService.verify(token)
      return payload
    } catch (err) {
      throw new WsException('Unauthorized: Invalid token')
    }
  }
}
