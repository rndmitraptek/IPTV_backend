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
            id_user     : payload.id_user,
            id_akun     : payload.id_akun,
            nama        : payload.nama,
            email       : payload.email,
            username    : payload.username,
            id_layanan  : payload.id_layanan,
            uuid_layanan: payload.uuid_layanan,
            layanan     : payload.layanan,
            tenant      : payload.tenant
        };
    }
}
