import { BaseNotFoundException } from '../../shared/exceptions/not-found'

export class JobNotFoundException extends BaseNotFoundException {
  constructor(jobId: number, error?: Error) {
    super(`El trabajo con el id ${jobId} no fue encontrado`, error)
  }
}
