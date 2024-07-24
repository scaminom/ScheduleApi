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

  async broadCastReminderCreation(reminder: Reminder) {
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

  async broadCastReminderUpdate(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: 'Actualización de cita administrativa',
          body: `Actualización de cita administrativa: ${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        },
      )
    })
  }

  async broadCastReminderDeletion(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: 'Eliminación de cita administrativa',
          body: `Eliminación de cita administrativa: ${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        },
      )
    })
  }

  async broadcastReminderFirstNotification(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: `Cita administrativa agendada en ${reminder.notificationMinutesBefore} minutos`,
          body: `Cita administrativa: ${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        },
      )
    })
  }

  async broadcastReminderSecondNotification(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification(
        {
          endpoint: subscription.endpoint,
          keys: subscription.keys as Prisma.JsonObject as webpush.PushSubscription['keys'],
        },
        {
          title: `Cita administrativa agendada en 1 minuto`,
          body: `Cita administrativa: ${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        },
      )
    })
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')
  }
}
