import { Injectable } from '@nestjs/common'
import { AppointmentsService } from './appointments.service'
import { AppointmentsGateway } from './appointments.gateway'
import { APPOINTMENT_STATUS } from '@prisma/client'

@Injectable()
export class AppointmentsBackgroundService {
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
    dateCopy.setSeconds(0)
    dateCopy.setMilliseconds(0)

    if (minutes === 20) {
      dateCopy.setMinutes(30)
    } else if (minutes === 50) {
      dateCopy.setMinutes(0)
      dateCopy.setHours(dateCopy.getHours() + 1)
    }

    console.log('dateCopy', dateCopy, 'background')

    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
      status: APPOINTMENT_STATUS.PENDING,
    })

    for (const appointment of appointments) {
      this.appointmentsGateway.broadcastAppointmentReminder(appointment)
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

    const appointments = await this.appointmentsService.findByFilters({
      date: dateCopy,
      status: APPOINTMENT_STATUS.PENDING,
    })

    for (const appointment of appointments) {
      this.appointmentsGateway.broadcastAppointmentNotification(appointment)
      this.appointmentsService.update(appointment.id, {
        status: APPOINTMENT_STATUS.COMPLETED,
      })
    }
  }
}
