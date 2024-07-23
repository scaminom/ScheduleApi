import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Prisma, Reminder, Role } from '@prisma/client'
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
export class RemindersGateway {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    private readonly notificationsService: NotificationsService,
  ) {}
  @WebSocketServer()
  server: Server

  async sendReminderToAdmins(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: 'Nueva cita administrativa',
          body: `Nueva cita administrativa: ${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        },
      )
    })
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')
  }
}
