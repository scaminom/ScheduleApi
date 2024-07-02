import { BaseConflictException } from '../../shared/exceptions/conflict'

export class UserInvalidCIException extends BaseConflictException {
  constructor(ci: string, error?: Error) {
    super(`Cédula: ${ci} no válida`, error)
  }
}
