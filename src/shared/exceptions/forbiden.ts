import { HttpStatus } from '@nestjs/common/enums/http-status.enum'
import { BaseException } from './base-exception'

export class BaseForbiddenException extends BaseException {
  constructor(message: string, error?: Error) {
    super('Prohibido', message, HttpStatus.FORBIDDEN, error)
  }
}
