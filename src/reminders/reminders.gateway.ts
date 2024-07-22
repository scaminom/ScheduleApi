import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Reminder } from '@prisma/client'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RemindersGateway {
  @WebSocketServer()
  server: Server

  sendReminderToAdmins(reminder: Reminder) {
    this.server.to('admins').emit('new-reminder', reminder)
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')

    console.log('Admin joined' + client.id)
  }
}
