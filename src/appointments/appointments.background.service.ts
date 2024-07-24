import { Injectable, Logger } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsGateway } from './appointments.gateway'

@Injectable()
export class AppointmentsBackgroundService {
  private readonly logger = new Logger(AppointmentsBackgroundService.name)

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly appointmentsGateway: AppointmentsGateway,
  ) {}

  async checkAppointments() {
    const now = new Date()
    const minutes = now.getMinutes()

    if (minutes === 20 || minutes === 50) {
      this.remindAppointments(minutes)
    } else if (minutes === 29 || minutes === 59) {
      this.notifyAppointments(minutes)
    }
  }

  private async remindAppointments(minutes: number) {
    const dateCopy = new Date()

    if (minutes === 20) {
      dateCopy.setMinutes(30)
    } else if (minutes === 50) {
      dateCopy.setMinutes(0)
      dateCopy.setHours(dateCopy.getHours() + 1)
    }

    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
    })

    for (const appointment of appointments) {
      this.logger.log(`Sending notification for appointment ${appointment.id}`)
      this.appointmentsGateway.broadcastAppointmentReminder(appointment)
      this.logger.log(`Notification sent for appointment ${appointment.id}`)
    }
  }

  private async notifyAppointments(minutes: number) {
    const dateCopy = new Date()

    if (minutes === 29) {
      dateCopy.setMinutes(30)
    } else if (minutes === 59) {
      dateCopy.setMinutes(0)
      dateCopy.setHours(dateCopy.getHours() + 1)
    }

    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
    })

    for (const appointment of appointments) {
      this.logger.log(
        `Sending last notification for appointment ${appointment.id}`,
      )
      this.appointmentsGateway.broadcastAppointmentNotification(appointment)
      this.logger.log(
        `Last notification sent for appointment ${appointment.id}`,
      )
    }
  }
}
