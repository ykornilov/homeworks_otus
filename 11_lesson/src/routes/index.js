const express = require('express');

const api = require('./api');
const {redirectAuthUser} = require('./api/middlewares');

const router = express.Router();

router.get('/', redirectAuthUser, api.resolveGetIndex);

router.post('/login', api.resolveLogin);
router.post('/logout', api.resolveLogout);

module.exports = router;
