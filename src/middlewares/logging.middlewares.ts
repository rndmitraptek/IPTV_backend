import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware{
    logger = new Logger('Response');
    constructor(private readonly jwtService: JwtService) {}
    use(req: Request, res: Response, next:NextFunction) {
            const authHeader = req.headers['authorization'];
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const payload = this.jwtService.decode(token);
                req['tenant'] = payload['tenant'];
            }

        const { method, url } = req;
        const reqTime = new Date().getTime();
        res.on('finish',()=>{
            const { statusCode } = res;
            const resTime = new Date().getTime();
            if (statusCode===201 || statusCode===200){
                this.logger.log(
                    `${method} ${url} ${statusCode} - ${ resTime - reqTime } ms`,
                );
            }
        })
        next();
    }
}