const mongoose = require('mongoose');

const resolveChangeAccess = (req, res) => {
    if (!req.courseAccess.isOwner) {
        res.redirect(`/course/${req.params.courseId}`);
    }

    if (req.course.users.includes(req.params.userId)) {
        req.course.users = req.course.users.filter(id => String(id) !== req.params.userId);
    } else {
        req.course.users.push(new mongoose.Types.ObjectId(req.params.userId));
    }

    req.course.save(error => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }

        res.json({[req.params.userId]: req.body.hasAccess});
    })
}

module.exports = {
    resolveChangeAccess,
};
