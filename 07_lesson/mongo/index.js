const mongoose = require('mongoose');
const {UserModel} = require('./models/users');

mongoose.connect(process.env.DB_HOST);

const db = mongoose.connection;

db.on('error', error => {
    console.error('error.message');
});
db.once('open', () => {
    console.info("Connected to MongoDB!");
});

module.exports = {
    UserModel,
};
