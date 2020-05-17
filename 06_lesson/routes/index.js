const express = require('express');

const api = require('./api');
const {redirectAuthUser} = require('./api/middlewares');

const router = express.Router();

router.get('/', redirectAuthUser, api.resolveGetIndex);

router.post('/signin', api.resolveSignin);
router.post('/signout', api.resolveSignout);

module.exports = router;
