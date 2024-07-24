import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Prisma, Role } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { NotificationsService } from 'src/notifications/notifications.service'
import { toEsEcDate } from 'src/shared/functions/local-date'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
import * as webpush from 'web-push'
import { IAppointmentWithUser } from './interfaces/i-appointment-with-user'

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

  async broadcastAppointmentCreation(appointment: IAppointmentWithUser) {
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
          body: `Nueva cita: Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  async broadcastAppointmentUpdate(appointment: IAppointmentWithUser) {
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
          title: 'Cita actualizada',
          body: `Cita actualizada: Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  async broadcastAppointmentDeletion(appointment: IAppointmentWithUser) {
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
          title: 'Cita cancelada',
          body: `Cita cancelada: Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  async broadcastAppointmentReminder(appointment: IAppointmentWithUser) {
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
          title: 'Cita agendada en 10 minutos',
          body: `Cita agendada: Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  async broadcastAppointmentNotification(appointment: IAppointmentWithUser) {
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
          title: 'Cita agendada para este momento',
          body: `Cita agendada: Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        },
      )
    })
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
