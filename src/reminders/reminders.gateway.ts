import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Reminder } from '@prisma/client'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RemindersGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('reminder')
  sendReminder(reminder: Reminder) {
    this.server.emit('reminder', reminder)
  }
}
