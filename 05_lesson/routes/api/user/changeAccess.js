const path = require('path');

const resolveChangeAccess = (req, res) => {
    if (!req.courseAccess.isOwner) {
        res.redirect(`/course/${req.params.courseId}`);
    }

    const userId = Number(req.params.userId);
    if (req.course.users.includes(userId)) {
        req.course.users = req.course.users.filter(id => id !== userId);
    } else {
        req.course.users.push(userId);
    }
  
    res.json({[userId]: req.body.hasAccess});
}

module.exports = {
    resolveChangeAccess,
};
