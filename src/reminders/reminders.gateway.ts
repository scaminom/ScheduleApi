import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Reminder, Role } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { NotificationsService } from 'src/notifications/notifications.service'
import { toEsEcDate } from 'src/shared/functions/local-date'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'

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
      this.notificationsService.sendPushNotification({
        title: 'Nueva cita administrativa',
        body: `${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadCastReminderUpdate(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Actualización de cita administrativa',
        body: `${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadCastReminderDeletion(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Eliminación de cita administrativa',
        body: `${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastReminderFirstNotification(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: `Cita administrativa agendada en ${reminder.notificationMinutesBefore} minutos`,
        body: `${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastReminderSecondNotification(reminder: Reminder) {
    this.server.to('admins').emit('reminders-change')

    const subscriptions = await this.subscriptionsService.findByRole(Role.ADMIN)
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: `Cita administrativa agendada en 1 minuto`,
        body: `${reminder.title} - ${toEsEcDate(new Date(reminder.reminderDate))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  @SubscribeMessage('joinAdminsRoom')
  handleJoinReminderJoin(@ConnectedSocket() client: Socket) {
    client.join('admins')
  }
}
