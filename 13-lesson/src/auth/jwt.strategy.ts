import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const cookieExtractor: JwtFromRequestFunction = req => req.cookies['token'];

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SK,
        });
    };

    async validate(payload: {sub: number, username: string}): Promise<User> {
        console.log(payload)
        return { id: payload.sub, username: payload.username };
    };
};
