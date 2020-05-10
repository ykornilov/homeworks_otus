const path = require('path');

const resolveCreateComment = (req, res) => {
    req.lesson.comments.push({
        id: Math.round(Math.random() * 100),
        owner: req.userId,
        content: req.body.content,
    });
  
    res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
}

module.exports = {
    resolveCreateComment,
};
