import { HttpStatus } from '@nestjs/common/enums/http-status.enum'
import { BaseException } from './base-exception'

export class BaseConflictException extends BaseException {
  constructor(message: string, error?: Error) {
    super('Existe un conflicto', message, HttpStatus.CONFLICT, error)
  }
}
