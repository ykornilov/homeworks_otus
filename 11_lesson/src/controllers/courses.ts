import path from 'path';
import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import {coursesService} from '../services/database';
import {ICourse} from '../services/database/models/courses';
import {BaseController} from './base';

class CoursesController extends BaseController {
    public initRouter() {
        this.router.use(this.jwtAuthenticate);
        this.router.use(this.resolveUser);

        this.router.put('/:courseId/user/:userId', this.resolveCourse, this.changeAccess);
        this.router.get('/:courseId/lesson/:lessonId/attachment/:attachmentId', this.resolveCourse, this.resolveLesson, this.getAttachment);
        this.router.post('/:courseId/lesson/:lessonId/attachment', this.resolveCourse, this.resolveLesson, this.createAttachment);
        this.router.post('/:courseId/lesson/:lessonId/comment', this.resolveCourse, this.resolveLesson, this.createComment);
        this.router.get('/:courseId/lesson/:lessonId', this.resolveCourse, this.resolveLesson, this.getLessonPage);
        this.router.get('/:courseId', this.resolveCourse, this.getCoursePage);
        this.router.post('/:courseId', this.resolveCourse, this.updateCourse);
        this.router.get('/', this.getCoursesPage);
        this.router.post('/', this.createCourse);
    };

    private jwtAuthenticate(req: Request, res: Response, next: NextFunction): void {
        passport.authenticate('jwt', {session: false}, (error, isAuth) => {
            if (error) return next(error);
    
            if (!isAuth) return res.redirect('/');
      
            next();
        })(req, res, next);
    };

    private resolveUser(req: Request, res: Response, next: NextFunction): void {
        const decoded = jwt.decode(req.cookies.token); 
        const userId = decoded && typeof decoded === 'object' && decoded.id;
        if (!userId) return res.redirect('/');
        
        req.userId = userId;
        
        next();
    };

    private resolveCourse(req: Request, res: Response, next: NextFunction): void {
        coursesService.getCourse(req.params.courseId)
            .then((course: ICourse | null): void => {
                if (!course) return res.redirect('/');
                req.course = course;
                const isOwner = String(course.owner) === req.userId;
                const hasAccess = isOwner || course.users.some(id => String(id) === req.userId);
                req.courseAccess = {isOwner, hasAccess};
                next();
            })
            .catch(next);
    };

    private resolveLesson(req: Request, res: Response, next: NextFunction): void {
        const {course} = req;

        if (!course) return res.redirect('/');

        const lesson = coursesService.getLesson(course, req.params.lessonId);
      
        if (!lesson || !req.courseAccess || !req.courseAccess.hasAccess) {
            return res.redirect(`/course/${course.id}`);
        }
      
        req.lesson = lesson;
    
        next();
    };

    private getCoursesPage(req: Request, res: Response, next: NextFunction): void {
        const isCreateMode = req.query.mode === 'create';

        if (isCreateMode) return res.render('create_course', {isAuthorized: true});

        coursesService.getCourses()
            .then(courses => res.render('courses', {isAuthorized: true, courses}))
            .catch(next);
    };

    private getCoursePage(req: Request, res: Response, next: NextFunction): void {
        const {course, courseAccess} = req;
        const isEditMode = req.query.mode === 'edit';

        if (!course) return res.redirect('/');

        if (isEditMode && courseAccess?.isOwner) return res.render('edit_course', {isAuthorized: true, course});

        coursesService.getUsersWithAccess(course)
            .then(users => res.render('course', {isAuthorized: true, course, users, ...courseAccess}))
            .catch(next);
    };

    private createCourse(req: Request, res: Response, next: NextFunction): void {
        const {title, description} = req.body;
        const userId = req.userId;

        coursesService.createCourse(userId, title, description)
            .then(courseId => res.redirect(`/course/${courseId}`))
            .catch(next);
    };

    private updateCourse(req: Request, res: Response, next: NextFunction): void {
        const {courseAccess} = req;

        if (!courseAccess?.isOwner) return res.redirect(`/course/${req.params.courseId}`);
    
        const {title, description, lessons} = req.body;
        coursesService.updateCourse(req.params.courseId, title, description, lessons)
            .then(() => res.redirect(`/course/${req.params.courseId}`))
            .catch(next);     
    };

    private getLessonPage(req: Request, res: Response): void {
        res.render('lesson', {
            isAuthorized: true,
            courseId: req.params.courseId,
            ...req.courseAccess,
            lesson: req.lesson,
        });
    };

    private getAttachment(req: Request, res: Response): void {
        if (!req.course) return res.redirect('/');
        const attachment = coursesService.getAttachment(req.course, req.params.lessonId, req.params.attachmentId);

        if (!attachment) return res.redirect(`/course/${req.params.courseId}`);

        res.download(path.join(__dirname, '..', '..', 'private', attachment.filename));
    };

    private createAttachment(req: Request, res: Response, next: NextFunction): void {
        if (!req.course || !req?.courseAccess?.isOwner || !req?.files?.attachment) return res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`);
        const attachment = Array.isArray(req.files.attachment) ? req.files.attachment[0] : req.files.attachment;

        attachment.mv(path.join(__dirname, '..', '..', 'private', attachment.name));
    
        coursesService.createAttachment(req.course, req.params.lessonId, attachment.name, req.body.description)
            .then(() => res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`))
            .catch(next);
    };

    private createComment(req: Request, res: Response, next: NextFunction): void {
        const {userId, course} = req;
        if (!course) return res.redirect('/');

        coursesService.createComment(course, req.params.lessonId, userId, req.body.content)
            .then(() => res.redirect(`/course/${req.params.courseId}/lesson/${req.params.lessonId}`))
            .catch(next);
    };

    private changeAccess(req: Request, res: Response, next: NextFunction): void {
        const {course, courseAccess} = req;
        if (!course || !courseAccess?.isOwner) return res.redirect(`/course/${req.params.courseId}`);

        if (course.users.includes(req.params.userId) && !req.body.hasAccess) {
            coursesService.removeUser(course, req.params.userId)
                .then(() => res.json({[req.params.userId]: false}))
                .catch(next);
        } else if (!course.users.includes(req.params.userId) && req.body.hasAccess) {
            coursesService.addUser(course, req.params.userId)
                .then(() => res.json({[req.params.userId]: true}))
                .catch(next)
        }
    };
};

export default new CoursesController().router;
