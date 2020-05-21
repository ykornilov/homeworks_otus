const mongoose = require('mongoose');
const {UserModel} = require('./models/users');
const {CourseModel} = require('./models/courses');

mongoose.connect('mongodb://localhost/my_courses');

const db = mongoose.connection;

db.on('error', error => {
    console.error('error.message');
});
db.once('open', () => {
    console.info("Connected to MongoDB!");
});

module.exports = {
    UserModel,
    CourseModel,
};
