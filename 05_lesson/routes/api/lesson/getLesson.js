const resolveGetLesson = (req, res) => res.render('lesson', {
    isAuthorized: true,
    courseId: req.params.courseId,
    ...req.courseAccess,
    lesson: req.lesson,
});

module.exports = {
    resolveGetLesson,
};
