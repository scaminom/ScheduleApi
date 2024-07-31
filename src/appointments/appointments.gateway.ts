import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets'
import { Role } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { NotificationsService } from 'src/notifications/notifications.service'
import { toEsEcDate } from 'src/shared/functions/local-date'
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service'
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
      this.notificationsService.sendPushNotification({
        title: 'Nueva cita',
        body: `Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastAppointmentUpdate(appointment: IAppointmentWithUser) {
    this.server.to('mechanics').emit('appointments-change')

    const subscriptions = await this.subscriptionsService.findByRole(
      Role.MECHANIC,
    )
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Cita actualizada',
        body: `Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastAppointmentDeletion(appointment: IAppointmentWithUser) {
    this.server.to('mechanics').emit('appointments-change')

    const subscriptions = await this.subscriptionsService.findByRole(
      Role.MECHANIC,
    )
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Cita cancelada',
        body: `Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastAppointmentReminder(appointment: IAppointmentWithUser) {
    const subscriptions = await this.subscriptionsService.findByRole(
      Role.MECHANIC,
    )
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Cita agendada en 10 minutos',
        body: `Cliente: ${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  async broadcastAppointmentNotification(appointment: IAppointmentWithUser) {
    const subscriptions = await this.subscriptionsService.findByRole(
      Role.MECHANIC,
    )
    subscriptions.forEach((subscription) => {
      this.notificationsService.sendPushNotification({
        title: 'Cita agendada para este momento',
        body: `${appointment.clientName} - Asignado a: ${appointment.user.firstName} ${appointment.user.lastName} - ${toEsEcDate(new Date(appointment.date))}`,
        endpoint: subscription.endpoint,
      })
    })
  }

  @SubscribeMessage('joinMechanicsRoom')
  handleJoinMechanicsRoom(@ConnectedSocket() client: Socket) {
    client.join('mechanics')
  }
}
