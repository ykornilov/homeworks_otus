const passport = require('passport');
const jwt = require('jsonwebtoken');

const {CourseModel} = require('../../mongo');

const redirectAuthUser = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, isAuth) => {
        if (error) return next(error);

        if (isAuth) return res.redirect('/course');

        next();
    })(req, res, next);
};

const jwtAuthenticate = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, isAuth) => {
        if (error) return next(error);

        if (!isAuth) return res.redirect('/');
  
        next();
    })(req, res, next);
};

const resolveUser = async (req, res, next) => {
    const userId = jwt.decode(req.cookies.token).id;
    if (!userId) return res.redirect('/');
    
    req.userId = userId;
    
    next();
};

const resolveCourse = (req, res, next) => {
    CourseModel.findById(req.params.courseId, (error, course) => {
        if (error) return res.redirect('/course');

        req.course = course;

        const isOwner = String(course.owner) === req.userId;
        const hasAccess = isOwner || course.users.some(id => String(id) === req.userId);
        req.courseAccess = {isOwner, hasAccess};

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
    jwtAuthenticate,
    redirectAuthUser,
    resolveUser,
    resolveCourse,
    resolveLesson,
};
