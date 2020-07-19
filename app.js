const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const nunjucks = require('nunjucks');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const bambooRouter = require('./routes/posts_bamboo');
const storyRouter = require('./routes/posts_story');
const classRouter = require('./routes/classes');
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig();

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV === 'development',
});
app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));
app.enable('trust proxy');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else {
  app.use(helmet());
  app.use(hpp());
  app.use((req, res, next) => {
    console.log(req.hostname, req.get('X-Forwarded-Proto'));
    if (['rebridge.me', 'www.rebridge.me'].includes(req.hostname) && req.get('X-Forwarded-Proto') === 'http') {
      res.redirect(`https://rebridge.me${req.url}`);
    } else {
      next();
    }
  });
  app.use(logger('combined'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser('REBRIDGE_COOKIE_PASS'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'REBRIDGE_COOKIE_PASS',
  cookie: {
    httpOnly: true,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/bamboo', bambooRouter);
app.use('/story', storyRouter);
app.use('/class', classRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
