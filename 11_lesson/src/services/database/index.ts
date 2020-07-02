import mongoose from 'mongoose';
export {default as usersService} from './users';
export {default as coursesService} from './courses';

if (process.env.DB_HOST) {
    mongoose.connect(process.env.DB_HOST);

    const db = mongoose.connection;

    db.on('error', error => {
        console.error(error.message);
    });

    db.once('open', () => {
        console.info('Connected to MongoDB');
    });
};
