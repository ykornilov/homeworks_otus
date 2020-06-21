const mongoose = require('mongoose');

const resolveCreateComment = (req, res, next) => {
    req.lesson.comments.push({
        owner: new mongoose.Types.ObjectId(req.userId),
        content: req.body.content,
    });

    req.course.save(error => {
        if (error) return next(error);

        res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
    })  
}

module.exports = {
    resolveCreateComment,
};
