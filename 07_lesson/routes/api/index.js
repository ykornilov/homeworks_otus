const {resolveGetIndex} = require('./authorization/getIndex');
const {resolveLogin} = require('./authorization/login');
const {resolveLogout} = require('./authorization/logout');

const {resolveGetUserPage} = require('./user/getUserPage');

module.exports = {
    resolveGetIndex,
    resolveLogin,
    resolveLogout,
    resolveGetUserPage,
}
