const jwt = require('jsonwebtoken');
const passport = require('passport');

const resolveLogin = (req, res) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error || !user) {
            return res.status(400).render('index', {message: info.message});
        }
        req.login(user, {session: false}, (error) => {
            if (error) return res.send(error);

            jwt.sign({id: user.id, login: user.login}, process.env.SK, {expiresIn: '30m'}, (error, token) => {
                if (error) return res.status(500).render('index', {message: error});

                res.cookie('token', token, {
                    secure: true,
                    maxAge: Date.now() + 60 * 60 * 1000 * 4,
                    domain: process.env.DOMAIN,
                    httpOnly: true});
                return res.redirect('/user');
            });
        });
    })(req, res);
}

module.exports = {
    resolveLogin,
};
