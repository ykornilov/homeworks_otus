import mongoose from 'mongoose';
import CourseModel, {ICourse, ILesson, IComment, IAttachment} from './models/courses';
import UserModel, {IUser, IUserWithAccess} from './models/users';

class CoursesService {
    getCourses(): Promise<ICourse[]> {
        CourseModel.find()
        return new Promise((resolve, reject) => CourseModel.find((error, courses) => {
            if (error) return reject(error);

            resolve(courses);
        }));
    };

    getCourse(courseId: ICourse['id']): Promise<ICourse | null> {
        return new Promise((resolve, reject) => {
            CourseModel.findById(courseId, (error, course) => {
                if (error) return reject(error);

                resolve(course);
            });
        });
    };

    createCourse(userId: IUser['id'], title: ICourse['title'], description: ICourse['description']): Promise<ICourse['id']> {
        return new Promise((resolve, reject) => {
            const course = new CourseModel({
                title,
                description,
                owner: new mongoose.Types.ObjectId(userId),
                lessons: [],
                users: [],
            });
    
            course.save((error, course) => {
                if (error) return reject(error);

                resolve(course.id);
            });
        });
    };

    updateCourse(courseId: ICourse['id'], title: ICourse['title'], description: ICourse['description'], lessons: ICourse['lessons']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.getCourse(courseId)
                .then(course => {
                    if (!course) return reject();

                    course.title = title;
                    course.description = description;
                    lessons.forEach((lesson, i) => {
                        if (!course.lessons[i]) {
                            course.lessons.push({
                                title: lesson.title,
                                description: lesson.description,
                                attachments: [],
                                comments: [],
                            });
                        } else {
                            course.lessons[i].title = lesson.title;
                            course.lessons[i].description = lesson.description;
                        }
                    });
                    if (lessons.length < course.lessons.length) {
                        course.lessons.splice(lessons.length, course.lessons.length - lessons.length);
                    };

                    course.save(error => {
                        if (error) return reject(error);

                        resolve();
                    });
                });
        });
    };

    getLesson(course: ICourse, lessonId: string): ILesson {
        return course.lessons.id(lessonId);
    };

    getAttachment(course: ICourse, lessonId: string, attachmentId: string): IAttachment {
        return this.getLesson(course, lessonId).attachments.id(attachmentId);
    };

    createComment(course: ICourse, lessonId: string, userId: IUser['id'], content: IComment['content']): Promise<void> {
        return new Promise((resolve, reject) => {
            const lesson = this.getLesson(course, lessonId);
            lesson.comments.push({
                owner: new mongoose.Types.ObjectId(userId),
                content,
            });

            course.save(error => {
                if (error) return reject(error);

                resolve();
            });
        });
    };

    createAttachment(course: ICourse, lessonId: string, filename: IAttachment['filename'], description: IAttachment['description']): Promise<void> {
        return new Promise((resolve, reject) => {
            const lesson = this.getLesson(course, lessonId);
            lesson.attachments.push({
                filename,
                description,
            });

            course.save(error => {
                if (error) return reject(error);

                resolve();
            });
        });
    };

    getUsersWithAccess(course: ICourse): Promise<IUserWithAccess[]> {
        return new Promise((resolve, reject) => {
            UserModel.find((error, users) => {
                if (error || users.length === 0) return resolve([]);

                resolve(users
                    // .filter(user => user.id === course.owner)
                    .map(({id, login}) => ({
                        id,
                        login,
                        hasAccess: course.users.some(userId => userId == id),
                    }))
                );
            });
        });
    };

    addUser(course: ICourse, userId: IUser['id']): Promise<void> {
        return new Promise((resolve, reject) => {
            course.users.push(new mongoose.Types.ObjectId(userId));
            
            course.save(error => {
                if (error) return reject(error);

                resolve();
            });
        });
    };

    removeUser(course: ICourse, userId: IUser['id']): Promise<void> {
        return new Promise((resolve, reject) => {
            course.users = course.users.filter(id => String(id) !== userId);

            course.save(error => {
                if (error) return reject(error);

                resolve();
            });
        });
    };
};

export default new CoursesService();
