const {updateCourse} = require('../../../utils/courses');

const resolveUpdateCourse = (req, res) => {
    const {courseAccess} = req;

    if (!courseAccess.isOwner) {
        return res.redirect(`/course/${req.params.courseId}`);
    }

    const {title, description, lessons} = req.body;
  
    updateCourse({courseId: Number(req.params.courseId), title, description, lessons});
    res.redirect(`/course/${req.params.courseId}`);
}

module.exports = {
    resolveUpdateCourse,
};
