const fs = require('fs');
const path = require('path');
const {atob, btoa} = require('./base64');

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), {encoding: 'utf8'}))

const getUsers = () => users.map(({id, login}) => ({id, login}));

const getUserId = token => {
    const [login, password] = btoa(token).split(':');

    const user = users.find(user => user.login === login && user.password === password)
    return user ? user.id : null;
}

const hasUser = token => Boolean(getUserId(token));

const signin = ({login, password}) => {
    const user = users.find(user => user.login === login && user.password === password);

    if (!user) return null;
    
    return atob(`${user.login}:${user.password}`);
}

module.exports = {
    getUsers,
    getUserId,
    hasUser,
    signin,
};
