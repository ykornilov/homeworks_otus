const express = require('express');

const api = require('./api');

const router = express.Router();

router.post('/login', api.resolveLogin);
router.post('/logout', api.resolveLogout);

module.exports = router;
