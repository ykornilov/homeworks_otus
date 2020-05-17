const mongoose = require('mongoose');
const {CourseModel} = require('../../../mongo');

const resolveUpdateCourse = (req, res) => {
    const {courseAccess} = req;

    if (!courseAccess.isOwner) {
        return res.redirect(`/course/${req.params.courseId}`);
    }

    const {title, description, lessons} = req.body;
  
    CourseModel.findById(req.params.courseId, (error, course) => {
        if (error) {
            res.statusCode = 500;
            return res.send({error: `Server error: ${error}`});
        }

        course.title = title;
        course.description = description;
        lessons.forEach((lesson, i) => {
            if (!course.lessons[i]) {
                course.lessons.push({
                    attachments: [],
                    comments: [],
                })
            }
            course.lessons[i].title = lesson.title;
            course.lessons[i].description = lesson.description;
        });
        if (lessons.length < course.lessons.length) {
            course.lessons = course.lessons.slice(0, lessons.length);
        };

        course.save(error => {
            if (error) {
                res.statusCode = 500;
                return res.send({error: `Server error: ${error}`});
            }

            res.redirect(`/course/${req.params.courseId}`);
        })
    });
}

module.exports = {
    resolveUpdateCourse,
};
