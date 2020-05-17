const {getUserId, hasUser} = require('../../utils/users');
const {getCourse, getCourseAccess} = require('../../utils/courses');

const redirectAuthUser = (req, res, next) => {
    if (!req.cookies.my_courses) {
      return next();
    }
  
    if (hasUser(req.cookies.my_courses)) {
      return res.redirect('/course');
    }
  
    next();
};

const resolveUser = (req, res, next) => {
    if (!req.cookies.my_courses || !hasUser(req.cookies.my_courses)) {
        return res.redirect('/');
    }
    
    req.userId = getUserId(req.cookies.my_courses);
    
    next();
};

const resolveCourse = (req, res, next) => {
    const courseId = Number(req.params.courseId);
    const course = getCourse(courseId);
  
    if (!course) {
        return res.redirect('/course');
    }
  
    req.course = course;
    req.courseAccess = getCourseAccess(courseId, req.userId);

    next();
};

const resolveLesson = (req, res, next) => {
    const lessonId = Number(req.params.lessonId);
    const {course} = req;

    const lesson = course.lessons.find(({id}) => id === lessonId);
  
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
