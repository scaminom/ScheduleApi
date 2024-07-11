import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class InspectionNotFoundException extends BaseNotFoundException {
  constructor(inspectionId: number, error?: Error) {
    super(`La inspección con el id ${inspectionId} no fue encontrada	`, error)
  }
}
