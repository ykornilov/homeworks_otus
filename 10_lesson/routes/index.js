const express = require('express');

const api = require('./api');

const router = express.Router();

router.get('/', api.resolveGetIndexPage);

module.exports = router;
