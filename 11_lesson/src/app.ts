import createError from 'http-errors';
import express, {Application, Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import logger from 'morgan';
import addRequestId from 'express-request-id';

import {passportInit} from './passport';
import {mainController, coursesController} from './controllers';
import {ICourse, ILesson} from './services/database/models/courses';

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

passportInit();

const app: Application = express();

// view engine setup and static
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '..', 'public')));

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

// logger
app.use(addRequestId({setHeader: false, attributeName: 'requestId'}));
logger.token('requestId', (req: Request) => req.requestId.split('-')[0]);
app.use(logger('[:date[iso] #:requestId] Started :method :url for :remote-addr', {immediate: true}));
app.use(logger('[:date[iso] #:requestId] Completed :status :res[content-length] in :response-time ms'));

// parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/course', coursesController);
app.use('/', mainController);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});
  
// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
