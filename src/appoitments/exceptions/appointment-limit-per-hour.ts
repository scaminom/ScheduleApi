import { BaseBadRequestException } from '../../shared/exceptions/bad-request'

export class AppointmentLimitPerHourException extends BaseBadRequestException {
  constructor(error?: Error) {
    super(
      'No se puede asignar más de 3 citas en el mismo rango de tiempo por hora',
      error,
    )
  }
}
