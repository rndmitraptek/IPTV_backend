import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StatusException, responseModel } from './response.model';

import * as dotenv from 'dotenv';
dotenv.config();
  
  @Injectable()
  export class CustomResponse<T> implements NestInterceptor<T, any> {
    logger: Logger;
    intercept(context: ExecutionContext, next: CallHandler): Observable<responseModel> {
      const http = context.switchToHttp();
      const request = http.getRequest();
      
      return next.handle().pipe(
        map(data => ({
          responseResult: true,
          statusCode :context.switchToHttp().getResponse().statusCode,
          data:data,
          message:['success']
        })),
        catchError(error => {
          if (error instanceof HttpException) {
            const statusCode = error.getStatus();
            const message = error.getResponse();

            throw new StatusException({
                responseResult: false,
                statusCode: statusCode,
                data:null,
                message:message
            },statusCode);
          }

          if(typeof error == 'string'){
              throw new StatusException({
                responseResult: false,
                statusCode: 200,//400,
                message: [error],
                data: null,
              },HttpStatus.OK);
          }

          if(Array.isArray(error)){
            throw new StatusException({
              responseResult: false,
              statusCode: 200,//400,
              message: error,
              data: null,
            },HttpStatus.OK);
          }

          this.logger = new Logger('ErrorLog');
          this.logger.error(request.method+' '+request.url +' body='+ JSON.stringify(request.body)+' param='+JSON.stringify(request.param)+' query='+JSON.stringify(request.query));
        
          throw new StatusException({
            responseResult: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error,
            data: null,
          },HttpStatus.INTERNAL_SERVER_ERROR);
        }),
      );
    }
  }