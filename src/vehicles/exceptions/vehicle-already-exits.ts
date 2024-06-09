import { BaseConflictException } from '../../shared/exceptions/conflict'

export class VehicleAlreadyExistsException extends BaseConflictException {
  constructor(plate: string, error?: Error) {
    super(`Vehículo con la placa: ${plate} ya existe`, error)
  }
}
