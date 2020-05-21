const {getUserId} = require('../../utils/users');
const {getCourseAccess} = require('../../utils/courses');

const {CourseModel} = require('../../mongo');

const redirectAuthUser = async (req, res, next) => {
    if (!req.cookies.my_courses) {
      return next();
    }
  
    const userId = await getUserId(req.cookies.my_courses);
    if (userId) {
        return res.redirect('/course');
    }
  
    next();
};

const resolveUser = async (req, res, next) => {
    const userId = await getUserId(req.cookies.my_courses);
    if (!userId) {
        return res.redirect('/');
    }
    
    req.userId = userId;
    
    next();
};

const resolveCourse = (req, res, next) => {
    CourseModel.findById(req.params.courseId, (error, course) => {
        if (error) {
            return res.redirect('/course');
        }

        req.course = course;
        req.courseAccess = getCourseAccess(course, req.userId);

        next();
    })
};

const resolveLesson = (req, res, next) => {
    const {course} = req;

    const lesson = course.lessons.id(req.params.lessonId)
  
    if (!lesson || !req.courseAccess.hasAccess) {
        return res.redirect(`/course/${course.id}`);
    }
  
    req.lesson = lesson;

    next();
};

module.exports = {
    redirectAuthUser,
    resolveUser,
    resolveCourse,
    resolveLesson,
};
