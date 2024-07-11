import { HttpException } from '@nestjs/common/exceptions/http.exception'

export class BaseException extends HttpException {
  private title: string

  constructor(
    title: string,
    message: string,
    statusCode: number,
    error?: Error,
  ) {
    super(message, statusCode, { cause: error })
    this.title = title
  }
}
