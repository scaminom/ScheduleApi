import { BaseConflictException } from '../../shared/exceptions/conflict'

export class VehicleInvalidPlateException extends BaseConflictException {
  constructor(plate: string, error?: Error) {
    super(`Vehículo con la placa: ${plate} no válida`, error)
  }
}
