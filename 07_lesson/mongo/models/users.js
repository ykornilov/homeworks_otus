const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    attempts: Number,
    blockedTill: Number,
    isDeactivated: Boolean,
});


const UserModel = mongoose.model('users', User);

module.exports = {
    UserModel,
};
