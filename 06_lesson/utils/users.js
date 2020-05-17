const {UserModel} = require('../mongo');
const {btoa} = require('./base64');

const getUserId = token => new Promise(resolve => {
    const [login, password] = btoa(token).split(':');
    UserModel.find({login, password}, (error, users) => {
        if (error || users.length === 0) resolve(null);

        resolve(users[0].id);
    })
})

const getUsers = () => new Promise(resolve => {
    UserModel.find((error, users) => {
        if (error || users.length === 0) resolve([]);

        resolve(users.map(({id, login}) => ({id, login})));
    })
})

module.exports = {
    getUserId,
    getUsers,
};
