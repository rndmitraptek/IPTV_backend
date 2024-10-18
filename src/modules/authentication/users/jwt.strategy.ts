import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return {
            id_user : payload.id_user,
            nama :payload.nama,
            username :payload.username,
            id_role :payload.id_role,
            is_admin :payload.is_admin,
            id_hotel :payload.id_hotel,
            id_session_device:payload.id_session_device
        };
    }
}
