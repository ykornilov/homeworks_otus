const path = require('path');

const resolveCreateAttachment = (req, res) => {
    if (!req.courseAccess.isOwner) {
        res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
    }

    const attachment = req.files.attachment;
    attachment.mv(path.join(__dirname, '..', '..', '..', 'private', attachment.name));

    req.lesson.attachments.push({
        id: Math.round(Math.random() * 100),
        filename: attachment.name,
        description: req.body.description,
    });
  
    res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
}

module.exports = {
    resolveCreateAttachment,
};
