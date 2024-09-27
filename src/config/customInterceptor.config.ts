import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatusException } from './response.model';


const IgnoredPropertyName = Symbol('IgnoredPropertyName')

export function CustomInterceptorIgnore() {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value[IgnoredPropertyName] = true
    };
}


@Injectable()
export class customInterceptor implements NestInterceptor {
    logger: Logger
    constructor() {
        // this.logger = new Logger('ErrorLogInterceptor');
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const http = context.switchToHttp();
        const request = http.getRequest();
        const query = JSON.stringify(request.query);
        const body = JSON.stringify(request.body);
        const param = JSON.stringify(request.params);
        let payload: any;
        if (query != '{}') {
            payload = query;
        }
        if (body != '{}') {
            payload = body;
        }
        if (param != '{}') {
            payload = param;
        }

        const isIgnored = context.getHandler()[IgnoredPropertyName]
        if (isIgnored) {
            return next.handle()
        } else {
            return next
                .handle()
                .pipe(
                    tap(
                        {
                            next: (value) => {
                                // if (request.method == 'GET' && request.url != '/healthz') {
                                if (request.url != '/health') {
                                    this.logger = new Logger('SuccessLog');
                                    this.logger.log('message :success, method :' + request.method + ', url :' + request.url + ', payload :' + payload);
                                }
                                throw new StatusException(value, HttpStatus.OK)
                            },
                            error: (error) => {
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
                                this.logger = new Logger('ErrorLog');
                                // console.log(error.response);
                                let msg = error;
                                let status = HttpStatus.BAD_REQUEST;
                                if (typeof error.original != 'undefined') {
                                    msg = error.message;
                                }
                                if (typeof error.response != 'undefined') {
                                    if (typeof error.response.statusCode != 'undefined') {
                                        status = error.response.statusCode;
                                        msg = error.response.message;
                                    } else {
                                        msg = error.response;
                                    }
                                }

                                // const report_log = { message: msg, url: request.url, payload: payload };
                                // this.logger.error(JSON.stringify(report_log));
                                this.logger.error('message :' + msg + ', method :' + request.method + ', url :' + request.url + ', payload :' + payload);
                                throw new StatusException({
                                    status: status,
                                    message: msg,
                                    data: '',
                                    response:error.response
                                }, status);
                                // throw new StatusException(error, HttpStatus.BAD_REQUEST)
                            }
                        }
                    ),
                );
        }
    }
}