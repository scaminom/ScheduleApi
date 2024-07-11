import { BaseConflictException } from '../../shared/exceptions/conflict'

export class JobAlreadyExitsException extends BaseConflictException {
  constructor(inspectionId?: number, error?: Error) {
    super(
      `Ya existe un trabajo con el mismo nombre en la inspección ${inspectionId ? `con id ${inspectionId}` : ''}`,
      error,
    )
  }
}
