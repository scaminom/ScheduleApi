import { BaseConflictException } from '../../shared/exceptions/conflict'

export class AppointmentPastDateException extends BaseConflictException {
  constructor(error?: Error) {
    super('La cita no puede ser asignada a una fecha pasada', error)
  }
}
