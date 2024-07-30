import { BaseBadRequestException } from '../../shared/exceptions/bad-request'

export class AppointmentLimitPerHourException extends BaseBadRequestException {
  constructor(limit: number, error?: Error) {
    super(
      `No se puede asignar más de ${limit} citas en el mismo rango de tiempo por hora`,
      error,
    )
  }
}
