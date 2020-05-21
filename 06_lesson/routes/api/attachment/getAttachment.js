const path = require('path');

const resolveGetAttachment = (req, res) => {
    const attachment = req.lesson.attachments.id(req.params.attachmentId);

    if (!attachment) {
        return res.redirect(`/course/${req.params.courseId}`)
    }
    
    res.download(path.join(__dirname, '..', '..', '..', 'private', attachment.filename));
}

module.exports = {
    resolveGetAttachment,
};
