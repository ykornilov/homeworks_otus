import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import {JwtFromRequestFunction} from 'passport-jwt';

import {usersService} from './services/database';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtractor: JwtFromRequestFunction = req => req.cookies['token'];

export const passportInit = (): void => {
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
    },
    (login, password, done) => usersService.getUser(login, password)
        .then(user => done(null, user))
        .catch(done)
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SK,
    },
    (jwtPayload, done) => {
        const expTime = jwtPayload.exp * 1000;
        const currentTime = new Date().getTime();

        if (currentTime < expTime) {
            return done(null, true);
        }

        return done(null, false);
    }));
}