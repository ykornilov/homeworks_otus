import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    login: string,
    password: string,
};

export interface IUserWithAccess {
    id: string,
    login: string,
    hasAccess: boolean,
};

const UserSchema: Schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

export default mongoose.model<IUser>('users', UserSchema);
