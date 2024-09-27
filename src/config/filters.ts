import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from 'express';
import { StatusException } from "./response.model";

@Catch(StatusException)
export class StatusFilter implements ExceptionFilter {
    catch(exception: StatusException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        if (status == 200) {
            response.status(status).json({ responseResult: true,status: status, message: 'success', data: exception.getResponse() });
        } else {
            response.status(status).json({ responseResult: false,status: status, message: exception.message });
        }

    }
}