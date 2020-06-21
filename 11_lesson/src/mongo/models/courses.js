const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Attachment = new Schema({
    filename: String,
    description: String,
});

const Comment = new Schema({
    owner: Schema.Types.ObjectId,
    content: String,
});

const Lesson = new Schema({
    title: {type: String, required: true},
    description: String,
    attachments: [Attachment],
    comments: [Comment],
});

const Course = new Schema({
    owner: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: String,
    lessons: [Lesson],
    users: [Schema.Types.ObjectId]
});


const CourseModel = mongoose.model('courses', Course);

module.exports = {
    CourseModel,
};
