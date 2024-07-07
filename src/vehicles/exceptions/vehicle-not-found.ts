import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class VehicleNotFoundException extends BaseNotFoundException {
  constructor(id: number, error?: Error) {
    super(`Vehículo con id: ${id} no encontrado`, error)
  }
}
