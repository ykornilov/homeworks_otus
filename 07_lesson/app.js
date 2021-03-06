const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const addRequestId = require('express-request-id')({setHeader: false});
const passport = require('passport');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

require('./passport');

const app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(addRequestId);
logger.token('id', req => req.id.split('-')[0]);
app.use(logger('[:date[iso] #:id] Started :method :url for :remote-addr', {immediate: true}));
app.use(logger('[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms'));
app.use(express.json());
// extended позволяет рабоать с массивами полей
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwtAuthenticate = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (error, isAuth, token) => {
      if (error || !isAuth) return res.redirect('/');

      if (token) {
          res.cookie('token', token, {
              secure: true,
              maxAge: Date.now() + 60 * 60 * 1000 * 4,
              domain: 'localhost',
              httpOnly: true}
          );
      }

      next();
  })(req, res, next)
}

app.use('/auth', authRouter);
app.use('/user', jwtAuthenticate, userRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
