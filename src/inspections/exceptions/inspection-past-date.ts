import { BaseConflictException } from '../../shared/exceptions/conflict'

export class InspectionPastDateException extends BaseConflictException {
  constructor(error?: Error) {
    super('La inspección no puede ser asignada a una fecha pasada', error)
  }
}
