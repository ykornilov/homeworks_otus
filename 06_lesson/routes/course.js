const express = require('express');
const api = require('./api');
const {resolveUser, resolveCourse, resolveLesson} = require('./api/middlewares');

const router = express.Router();

router.use(resolveUser);

router.put('/:courseId/user/:userId', resolveCourse, api.resolveChangeAccess);

router.get('/:courseId/lesson/:lessonId/attachment/:attachmentId', resolveCourse, resolveLesson, api.resolveGetAttachment);
router.post('/:courseId/lesson/:lessonId/attachment', resolveCourse, resolveLesson, api.resolveCreateAttachment);

router.post('/:courseId/lesson/:lessonId/comment', resolveCourse, resolveLesson, api.resolveCreateComment);

router.get('/:courseId/lesson/:lessonId', resolveCourse, resolveLesson, api.resolveGetLesson);

router.get('/:courseId', resolveCourse, api.resolveGetCourse);
router.post('/:courseId', resolveCourse, api.resolveUpdateCourse);

router.get('/', api.resolveGetCourses);
router.post('/', api.resolveCreateCourse);

module.exports = router;
