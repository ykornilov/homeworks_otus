const {getUsers} = require('../../../utils/users');

const resolveGetCourse = (req, res) => {
    const {course, courseAccess} = req;
    const isEditMode = req.query.mode === 'edit';
    const users = getUsers()
        // .filter(user => user.id === course.owner)
        .map(user => ({
            ...user,
            hasAccess: course.users.some(id => id === user.id),
        }));
  
    return isEditMode && courseAccess.isOwner 
        ? res.render('edit_course', {isAuthorized: true, course})
        : res.render('course', {isAuthorized: true, course, users, ...courseAccess});
}

module.exports = {
    resolveGetCourse,
};
