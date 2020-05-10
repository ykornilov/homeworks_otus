const {createCourse} = require('../../../utils/courses');

const resolveCreateCourse = (req, res) => {
    const {title, description} = req.body;
    const userId = req.userId;
  
    courseId = createCourse({userId, title, description});
    res.redirect(`/course/${courseId}`);
}

module.exports = {
    resolveCreateCourse,
};
