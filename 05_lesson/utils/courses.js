const fs = require('fs');
const path = require('path');

const courses = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'courses.json'), {encoding: 'utf8'}));

const getCourses = () => courses;

const getCourse = courseId => courses.find(({id}) => courseId === id);

const getCourseAccess = (courseId, userId) => {
    const course = getCourse(courseId);
    const isOwner = course.owner === userId;
    const hasAccess = isOwner || course.users.some(id => id === userId);

    return {isOwner, hasAccess};
}

const createCourse = ({userId, title, description}) => {
    const courseId = courses[courses.length - 1].id + 1;

    courses.push({
        id: courseId,
        owner: userId,
        title,
        description,
        lessons: [],
        users: [],
    });

    return courseId;
}

const updateCourse = ({courseId, title, description, lessons}) => {
    const course = getCourse(courseId);
    course.title = title;
    course.description = description;
    lessons.forEach((lesson, i) => {
        if (!course.lessons[i]) {
            course.lessons.push({
                id: course.lessons.length ? course.lessons[course.lessons.length - 1].id + 1 : 1,
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
}

module.exports = {
    createCourse,
    getCourse,
    getCourses,
    getCourseAccess,
    updateCourse,
};
