import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RemindersGateway {
  @WebSocketServer()
  server: Server

  sendReminderOnCreate() {
    this.server.to('admins').emit('new-reminder')
  }

  sendReminderOnUpdate() {
    this.server.to('admins').emit('reminder-updated')
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')
  }
}
