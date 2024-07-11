import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class UserNotFoundException extends BaseNotFoundException {
  constructor(ci?: string, error?: Error) {
    super(
      ci ? `Usuario con cédula: ${ci} no encontrado` : 'Usario no encontrado',
      error,
    )
  }
}
