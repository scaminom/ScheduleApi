import { HttpStatus } from '@nestjs/common/enums/http-status.enum'
import { BaseException } from './base-exception'

export class BaseBadRequestException extends BaseException {
  constructor(message: string, error?: Error) {
    super('Petición Incorrecta', message, HttpStatus.BAD_REQUEST, error)
  }
}
