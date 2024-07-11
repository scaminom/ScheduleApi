import { BaseConflictException } from '../../shared/exceptions/conflict'

export class AppointmentAlreadyExitsException extends BaseConflictException {
  constructor(mechanicCI: string, error?: Error) {
    super(
      `El mecánico con cédula: ${mechanicCI} ya tiene una cita asignada en el horario seleccionado`,
      error,
    )
  }
}
