import { HttpStatus } from '@nestjs/common/enums/http-status.enum'
import { BaseException } from './base-exception'

export class BaseNotFoundException extends BaseException {
  constructor(message: string, error?: Error) {
    super('No encontrado', message, HttpStatus.NOT_FOUND, error)
  }
}
