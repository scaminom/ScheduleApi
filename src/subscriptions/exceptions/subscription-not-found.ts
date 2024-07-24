import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class SubscriptionNotFoundException extends BaseNotFoundException {
  constructor(error?: Error) {
    super(`La subscripción no fue encontrada	`, error)
  }
}
