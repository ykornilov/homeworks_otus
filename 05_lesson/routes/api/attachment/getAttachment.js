const path = require('path');

const resolveGetAttachment = (req, res) => {
    const attachmentId = Number(req.params.attachmentId);
    
    const attachment = req.lesson.attachments.find(({id}) => id === attachmentId)
    if (!attachment) {
        return res.redirect(`/course/${req.params.courseId}`)
    }
    
    res.download(path.join(__dirname, '..', '..', '..', 'private', attachment.filename));
}

module.exports = {
    resolveGetAttachment,
};
