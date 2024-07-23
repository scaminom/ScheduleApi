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
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server

  sendAppointmentOnCreate() {
    this.server.to('mechanics').emit('new-appointment')
  }

  sendAppointmentOnUpdate() {
    this.server.to('mechanics').emit('appointment-updated')
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
