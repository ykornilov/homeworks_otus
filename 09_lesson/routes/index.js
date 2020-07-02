const express = require('express');

const api = require('./api');

const router = express.Router();

router.get('/', api.resolveGetIndexPage);
router.post('/task', api.resolveTask);

module.exports = router;
