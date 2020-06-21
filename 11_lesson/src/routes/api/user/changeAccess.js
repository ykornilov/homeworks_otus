const mongoose = require('mongoose');

const resolveChangeAccess = (req, res, next) => {
    if (!req.courseAccess.isOwner) {
        res.redirect(`/course/${req.params.courseId}`);
    }

    if (req.course.users.includes(req.params.userId)) {
        req.course.users = req.course.users.filter(id => String(id) !== req.params.userId);
    } else {
        req.course.users.push(new mongoose.Types.ObjectId(req.params.userId));
    }

    req.course.save(error => {
        if (error) return next(error);

        res.json({[req.params.userId]: req.body.hasAccess});
    })
}

module.exports = {
    resolveChangeAccess,
};
