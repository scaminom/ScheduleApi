import { BaseConflictException } from '../../shared/exceptions/conflict'

export class AppointmentLaboralHoursException extends BaseConflictException {
  constructor(error?: Error) {
    super(
      'La cita no puede ser asignada fuera del horario laboral (8:00 am - 17:00 pm)',
      error,
    )
  }
}
