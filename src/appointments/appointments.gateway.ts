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

  sendAppointmentToMechanics() {
    this.server.to('mechanics').emit('appointments-change')
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
