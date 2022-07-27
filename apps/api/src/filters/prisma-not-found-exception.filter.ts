import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

/**
 * Custom exception filter to convert Errors from Prisma to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status;

    switch (exception.code) {
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return response.status(status).json({
      statusCode: exception.code,
      message: exception.message,
    });
  }
}
