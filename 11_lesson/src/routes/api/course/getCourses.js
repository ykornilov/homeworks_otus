const {CourseModel} = require('../../../mongo');

const resolveGetCourses = (req, res, next) => {
    CourseModel.find((error, courses) => {
        if (error) return next(error)

        const isCreateMode = req.query.mode === 'create';
  
        return isCreateMode
            ? res.render('create_course', {isAuthorized: true})
            : res.render('courses', {isAuthorized: true, courses});
    })
}

module.exports = {
    resolveGetCourses,
};
