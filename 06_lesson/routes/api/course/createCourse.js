const mongoose = require('mongoose');
const {CourseModel} = require('../../../mongo');

const resolveCreateCourse = (req, res) => {
    const {title, description} = req.body;
    const userId = req.userId;

    const course = new CourseModel({
        title,
        description,
        owner: new mongoose.Types.ObjectId(userId),
        lessons: [],
        users: [],
    });

    course.save((error, course) => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }
        
        res.redirect(`/course/${course.id}`);
    });
}

module.exports = {
    resolveCreateCourse,
};
