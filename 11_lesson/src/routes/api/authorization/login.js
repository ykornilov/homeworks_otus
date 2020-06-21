const jwt = require('jsonwebtoken');
const passport = require('passport');

const resolveLogin = (req, res, next) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error) return next(error);

        if (!user) {
            return res.status(403).render('index', {title: 'Express', message: info.message});
        }
        req.login(user, {session: false}, (error) => {
            if (error) return next(error);

            jwt.sign({id: user.id, login: user.login}, process.env.SK, {expiresIn: '30m'}, (error, token) => {
                if (error) return next(error);

                res.cookie('token', token, {
                    secure: true,
                    maxAge: Date.now() + 60 * 60 * 1000,
                    domain: process.env.DOMAIN,
                    httpOnly: true});
                return res.redirect('/course');
            });
        });
    })(req, res, next);
}

module.exports = {
    resolveLogin,
};
