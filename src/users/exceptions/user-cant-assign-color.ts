import { BaseConflictException } from '../../shared/exceptions/conflict'

export class UserCantAssignColorException extends BaseConflictException {
  constructor(error?: Error) {
    super(
      `Solo se puede asignar un color para usuarios de tipo mecánico`,
      error,
    )
  }
}
