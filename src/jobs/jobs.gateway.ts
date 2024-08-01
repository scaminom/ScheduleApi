import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class JobsGateway {
  @WebSocketServer()
  server: Server

  async broadcastJobCreation() {
    this.server.to('mechanics').emit('jobs-change')
  }

  async broadcastJobUpdate() {
    this.server.to('mechanics').emit('jobs-change')
  }

  async broadcastJobDeletion() {
    this.server.to('mechanics').emit('jobs-change')
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
