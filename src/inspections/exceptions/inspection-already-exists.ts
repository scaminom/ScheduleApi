import { BaseConflictException } from '../../shared/exceptions/conflict'

export class InspectionAlreadyExitsException extends BaseConflictException {
  constructor(error?: Error) {
    super('Ya existe una inspección para la fecha seleccionada', error)
  }
}
