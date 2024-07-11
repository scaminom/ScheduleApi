import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class ReminderNotFoundException extends BaseNotFoundException {
  constructor(id?: number, error?: Error) {
    super(
      id
        ? `Recordatorio con id: ${id} no encontrado`
        : 'Recordatorio no encontrado',
      error,
    )
  }
}
