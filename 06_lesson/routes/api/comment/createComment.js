const mongoose = require('mongoose');

const resolveCreateComment = (req, res) => {
    req.lesson.comments.push({
        owner: new mongoose.Types.ObjectId(req.userId),
        content: req.body.content,
    });

    req.course.save(error => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }

        res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
    })  
}

module.exports = {
    resolveCreateComment,
};
