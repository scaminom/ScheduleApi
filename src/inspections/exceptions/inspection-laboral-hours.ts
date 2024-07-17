import { BaseConflictException } from '../../shared/exceptions/conflict'

export class InspectionLaboralHoursException extends BaseConflictException {
  constructor(error?: Error) {
    super(
      'La inspección no puede ser asignada fuera del horario laboral (8:00 am - 17:00 pm)',
      error,
    )
  }
}
