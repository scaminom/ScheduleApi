import { Injectable, Logger } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsGateway } from './appointments.gateway'
import { APPOINTMENT_STATUS } from '@prisma/client'

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
    console.log('Checking appointments...', minutes)

    if (minutes === 20 || minutes === 50) {
      this.remindAppointments(minutes)
    } else if (minutes === 29 || minutes === 59) {
      this.notifyAppointments(minutes)
    }
  }

  private async remindAppointments(minutes: number) {
    const dateCopy = new Date()
    dateCopy.setSeconds(0)
    dateCopy.setMilliseconds(0)

    if (minutes === 20) {
      dateCopy.setMinutes(30)
    } else if (minutes === 50) {
      dateCopy.setMinutes(0)
      dateCopy.setHours(dateCopy.getHours() + 1)
    }

    console.log('Reminding appointments...', dateCopy)
    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
      status: APPOINTMENT_STATUS.PENDING,
    })

    console.log('Appointments found:', appointments.length)
    for (const appointment of appointments) {
      this.logger.log(`Sending notification for appointment ${appointment.id}`)
      this.appointmentsGateway.broadcastAppointmentReminder(appointment)
      this.logger.log(`Notification sent for appointment ${appointment.id}`)
    }
  }

  private async notifyAppointments(minutes: number) {
    const dateCopy = new Date()
    dateCopy.setSeconds(0)
    dateCopy.setMilliseconds(0)

    if (minutes === 29) {
      dateCopy.setMinutes(30)
    } else if (minutes === 59) {
      dateCopy.setMinutes(0)
      dateCopy.setHours(dateCopy.getHours() + 1)
    }

    console.log('Notifying appointments...', dateCopy)

    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
      status: APPOINTMENT_STATUS.PENDING,
    })

    console.log('Appointments found:', appointments.length)

    for (const appointment of appointments) {
      this.logger.log(
        `Sending last notification for appointment ${appointment.id}`,
      )
      this.appointmentsGateway.broadcastAppointmentNotification(appointment)
      this.appointmentsService.update(appointment.id, {
        status: APPOINTMENT_STATUS.COMPLETED,
      })
      this.logger.log(
        `Last notification sent for appointment ${appointment.id}`,
      )
    }
  }
}
