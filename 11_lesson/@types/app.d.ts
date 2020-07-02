import {ICourse, ILesson} from '../src/services/database/models/courses';

declare global {
    export namespace Express {
        export interface Request {
            requestId: string,
            userId?: string,
            course?: ICourse,
            courseAccess?: {
                isOwner: boolean,
                hasAccess: boolean,
            },
            lesson?: ILesson,
        }
    }
}
