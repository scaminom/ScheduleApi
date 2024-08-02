import { BaseConflictException } from '../../shared/exceptions/conflict'

export class SubscriptionAlreadyExistsException extends BaseConflictException {
  constructor(error?: Error) {
    super('Las notificaciones ya están habilitadas', error)
  }
}
