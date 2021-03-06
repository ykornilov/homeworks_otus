const {CourseModel} = require('../../../mongo');

const resolveGetCourses = (req, res) => {
    CourseModel.find((error, courses) => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }

        const isCreateMode = req.query.mode === 'create';
  
        return isCreateMode
            ? res.render('create_course', {isAuthorized: true})
            : res.render('courses', {isAuthorized: true, courses});
    })
}

module.exports = {
    resolveGetCourses,
};
