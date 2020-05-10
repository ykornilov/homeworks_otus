const {updateCourse} = require('../../../utils/courses');

const resolveUpdateCourse = (req, res) => {
    const {course, courseAccess} = req;

    if (!courseAccess.isOwner) {
        return res.redirect(`/course/${req.params.courseId}`);
    }

    const {title, description, lessons} = req.body;
  
    updateCourse({courseId, title, description, lessons});
    res.redirect(`/course/${req.params.courseId}`);
}

module.exports = {
    resolveUpdateCourse,
};
