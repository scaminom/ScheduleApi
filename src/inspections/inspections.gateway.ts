import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class InspectionsGateway {
  constructor() {}

  @WebSocketServer()
  server: Server

  async broadcastInspectionCreation() {
    this.server.to('mechanics').emit('inspections-change')
  }

  async broadcastInspectionUpdate() {
    this.server.to('mechanics').emit('inspections-change')
  }

  async broadcastInspectionDeletion() {
    this.server.to('mechanics').emit('inspections-change')
  }
}
