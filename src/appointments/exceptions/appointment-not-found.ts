import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class AppointmentNotFoundException extends BaseNotFoundException {
  constructor(appointmentId: number, error?: Error) {
    super(`La cita con el id ${appointmentId} no fue encontrada	`, error)
  }
}
