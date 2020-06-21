const path = require('path');

const resolveCreateAttachment = (req, res, next) => {
    if (!req.courseAccess.isOwner) {
        res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
    }

    const attachment = req.files.attachment;
    attachment.mv(path.join(__dirname, '..', '..', '..', '..', 'private', attachment.name));

    req.lesson.attachments.push({
        filename: attachment.name,
        description: req.body.description,
    });

    req.course.save(error => {
        if (error) return next(error);

        res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
    });
}

module.exports = {
    resolveCreateAttachment,
};
