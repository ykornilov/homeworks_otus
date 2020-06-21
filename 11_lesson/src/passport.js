const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require("passport-jwt");

const {UserModel} = require('./mongo');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
    }, 
    (login, password, cb) => UserModel.findOne({login})
        .then(user => {
            if (!user) {
                bcrypt.hash(password, 8, (error, hash) => {
                    if (error) cb(error);

                    const newUser = new UserModel({
                        login,
                        password: hash,
                    });

                    newUser.save((error, user) => {
                        if (error) {
                            return cb(error);
                        }

                        return cb(null, user, {message: 'Создан новый пользователь'});
                    })
                });
            } else {
                bcrypt.compare(password, user.password, (error, isEquals) => {
                    if (error) cb(error);

                    if (!isEquals) {
                        return cb(null, false, {message: 'Неправильный пароль'});
                    } 
                    cb(null, user, {message: 'Успешная аутентификация'});
                });
            }
        })
        .catch(cb),
));

const cookieExtractor = req => req.cookies['token'];

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SK,
    },
    (jwtPayload, cb) => {
        const expTime = jwtPayload.exp * 1000;
        const currentTime = new Date().getTime();

        if (currentTime < expTime) {
            return cb(null, true);
        }

        return cb(null, false);
    }
));
