var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var usersbuyerRouter = require('./routes/users_buyer');
var usersentryRouter = require('./routes/users_entry');
var userslogistcRouter = require('./routes/users_logistic');
var usersorderRouter = require('./routes/users_order');
var userssellerRouter = require('./routes/users_seller');
var usersmonthRouter = require('./routes/users_analysis_month');
var usersseasonRouter = require('./routes/users_analysis_season');
var usersyearRouter = require('./routes/users_analysis_year');
var usersreportRouter = require('./routes/users_analysis_report');


var session = require('express-session');

var app = express();

app.use(express.static(path.join(__dirname,'/public')));


app.use(session({
    secret: 'an',
    resave: false,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser("An"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/users_entry', usersentryRouter);
app.use('/users_buyer', usersbuyerRouter);
app.use('/users_logistic', userslogistcRouter);
app.use('/users_order', usersorderRouter);
app.use('/users_seller', userssellerRouter);
app.use('/users_analysis_month', usersmonthRouter);
app.use('/users_analysis_season', usersseasonRouter);
app.use('/users_analysis_year', usersyearRouter);
app.use('/users_analysis_report', usersreportRouter);

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
