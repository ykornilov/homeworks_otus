const {getCourses} = require('../../../utils/courses');

const resolveGetCourses = (req, res) => {
    const courses = getCourses();
    const isCreateMode = req.query.mode === 'create';
  
    return isCreateMode
        ? res.render('create_course', {isAuthorized: true})
        : res.render('courses', {isAuthorized: true, courses});
}

module.exports = {
    resolveGetCourses,
};
