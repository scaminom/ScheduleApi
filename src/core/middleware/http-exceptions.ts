import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    response.status(status).json({
      statusCode: status,
      title:
        exception.response?.title ||
        exception.title ||
        exception.name === 'BadRequestException'
          ? 'Petición incorrecta'
          : exception.name || 'Internal Server Error',
      message:
        exception.response?.detail ||
        exception.detail ||
        exception.response?.message ||
        exception.message ||
        'Internal Server Error',
      // instance:
      //   exception.response?.instance ||
      //   exception.instance ||
      //   exception.stack ||
      //   'Internal Server Error',
    })
  }
}
