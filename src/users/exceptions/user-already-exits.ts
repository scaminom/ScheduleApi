import { BaseConflictException } from '../../shared/exceptions/conflict'

export class UserAlreadyExistsException extends BaseConflictException {
  constructor(ci: string, error?: Error) {
    super(`Usuario con cédula: ${ci} ya existe`, error)
  }
}
