import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Appointment, Prisma, Role } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { NotificationsService } from 'src/notifications/notifications.service'
import { toEsEcDate } from 'src/shared/functions/local-date'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import * as webpush from 'web-push'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppointmentsGateway {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @WebSocketServer()
  server: Server

  async sendAppointmentToMechanics(appointment: Appointment) {
    this.server.to('mechanics').emit('appointments-change')

    const subscriptions = await this.subscriptionsService.findByRole(
      Role.MECHANIC,
    )
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: 'Nueva cita',
          body: `Nueva cita: ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
