import mongoose, {Schema, Document, Types, MongooseDocument} from 'mongoose';
import  {IUser} from './users';

export interface IAttachment extends Types.Subdocument {
    filename: string,
    description: string,
};

const AttachmentSchema: Schema = new Schema({
    filename: String,
    description: String,
});

export interface IComment extends Types.Subdocument {
    owner: IUser['_id'],
    content: string,
};

const CommentSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, required: true},
    content: {type: String, required: true},
});

export interface ILesson extends Types.Subdocument {
    title: string,
    description: string,
    attachments: Types.DocumentArray<IAttachment>,
    comments: Types.DocumentArray<IComment>,
};

const LessonSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: String,
    attachments: [AttachmentSchema],
    comments: [CommentSchema],
});

export interface ICourse extends Document {
    owner: IUser['_id'],
    title: string,
    description: string,
    lessons: Types.DocumentArray<ILesson>,
    users: Array<IUser['_id']>,
}

const CourseSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, required: true},
    title: {type: String, required: true},
    description: String,
    lessons: [LessonSchema],
    users: [Schema.Types.ObjectId],
});

export default mongoose.model<ICourse>('courses', CourseSchema);
