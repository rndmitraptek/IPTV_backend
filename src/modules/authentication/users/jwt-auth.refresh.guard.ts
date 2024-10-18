import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { AuthGuard } from '@nestjs/passport';
import { responseModel } from 'src/config/response.model';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            console.log(err, user);

            let errorException = new HttpException(
                {
                    responseResult: false,
                    message: ['refresh token invalid'],
                    data: '',
                } as responseModel,
                HttpStatus.UNAUTHORIZED
            );

            throw err || errorException;
        }
        return user;
    }
}
