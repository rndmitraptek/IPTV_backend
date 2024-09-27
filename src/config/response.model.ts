export class responseModel {
    responseResult: boolean;
    statusCode: number;
    message: any;
    data: any;
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class StatusException extends HttpException {
    constructor(data, status: HttpStatus) {
        super(data, status);
    }
}