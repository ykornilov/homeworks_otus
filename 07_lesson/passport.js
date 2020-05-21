const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require("passport-jwt");

const {UserModel} = require('./mongo');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const MAX_ATTEMPTS = 3;

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
    }, 
    (login, password, next) => UserModel.findOne({login})
        .then(user => {
            if (!user) {
                bcrypt.hash(password, 8, (error, hash) => {
                    if (error) next(error);

                    const newUser = new UserModel({
                        login,
                        password: hash,
                    });

                    newUser.save((error, user) => {
                        if (error) {
                            return next(error);
                        }

                        return next(null, user, {message: 'Создан новый пользователь'});
                    })
                });
            } else if (user.blockedTill > new Date().getTime() / 1000) {
                return next(null, false, {message: `Пользователь заблокирован до ${new Date(user.blockedTill * 1000)}`});
            } else {
                bcrypt.compare(password, user.password, (error, isEquals) => {
                    if (error) next(error);

                    if (!isEquals) {
                        user.attempts = user.attempts ? user.attempts + 1 : 1;
                        if (user.attempts >= MAX_ATTEMPTS) {
                            user.blockedTill = new Date().getTime() / 1000 + 60;
                        }
    
                        user.save(_ => {
                            return next(null, false, {message: `Неправильный пароль. Осталось попыток: ${MAX_ATTEMPTS - user.attempts}`});
                        });
                    } else {
                        user.attempts = 0;
                        user.blockedTill = 0;
                        user.save((_, user) => {
                            return next(null, user, {message: 'Успешная аутентификация'});
                        });
                    }
                });
            }
        })
        .catch(next),
));

const cookieExtractor = req => req.cookies['token'];

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SK,
    },
    (jwtPayload, next) => {
        const expTime = jwtPayload.exp * 1000;
        const currentTime = new Date().getTime();

        if (expTime > currentTime && expTime - currentTime < 10 * 60 * 1000) {
            jwt.sign({id: jwtPayload.id, login: jwtPayload.login}, process.env.SK, {expiresIn: '30m'}, (error, token) => {
                if (error) return next(error);
    
                return next(null, true, token);
            });
        } else {
            return next(null, true)
        }
    }
));
