const {UserModel} = require('../../../mongo');

const resolveGetCourse = async (req, res) => {
    const {course, courseAccess} = req;
    const isEditMode = req.query.mode === 'edit';
    UserModel.find((error, users) => {
        const usersWithAccess = error || users.length === 0
            ? []
            : users
                 // .filter(user => user.id === course.owner)
                .map(({id, login}) => ({
                    id,
                    login,
                    hasAccess: course.users.some(userId => userId == id),
                }));

        return isEditMode && courseAccess.isOwner 
            ? res.render('edit_course', {isAuthorized: true, course})
            : res.render('course', {isAuthorized: true, course, users: usersWithAccess, ...courseAccess});
    });
}

module.exports = {
    resolveGetCourse,
};
