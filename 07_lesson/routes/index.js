const express = require('express');
const passport = require('passport');

const api = require('./api');

const router = express.Router();

const redirectAuthUser = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, isAuth) => {
        if (error) return res.send(error);

        if (isAuth) return res.redirect('/user');

        next();
    })(req, res, next)
}

router.get('/', redirectAuthUser, api.resolveGetIndex);

module.exports = router;
