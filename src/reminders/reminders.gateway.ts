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

  sendReminderToAdmins() {
    this.server.to('admins').emit('reminders-change')
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')
  }
}
