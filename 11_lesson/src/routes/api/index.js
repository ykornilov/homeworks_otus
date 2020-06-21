const {resolveGetIndex} = require('./authorization/getIndex');
const {resolveLogin} = require('./authorization/login');
const {resolveLogout} = require('./authorization/logout');

const {resolveCreateCourse} = require('./course/createCourse');
const {resolveGetCourse} = require('./course/getCourse');
const {resolveGetCourses} = require('./course/getCourses');
const {resolveUpdateCourse} = require('./course/updateCourse');

const {resolveGetLesson} = require('./lesson/getLesson');

const {resolveGetAttachment} = require('./attachment/getAttachment');
const {resolveCreateAttachment} = require('./attachment/createAttachment');

const {resolveCreateComment} = require('./comment/createComment');

const {resolveChangeAccess} = require('./user/changeAccess');

module.exports = {
    resolveGetIndex,
    resolveLogin,
    resolveLogout,
    resolveCreateCourse,
    resolveGetCourse,
    resolveGetCourses,
    resolveUpdateCourse,
    resolveGetLesson,
    resolveCreateAttachment,
    resolveGetAttachment,
    resolveCreateComment,
    resolveChangeAccess,
}
