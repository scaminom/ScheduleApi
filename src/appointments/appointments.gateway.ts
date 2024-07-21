import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Appointment } from '@prisma/client'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server

  sendAppointmentToMechanics(appointment: Appointment) {
    this.server.to('mechanics').emit('new-appointment', appointment)
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
