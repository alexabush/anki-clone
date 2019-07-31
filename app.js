var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var api = require('./routes/api');

var app = express();

// TODO refactor to only respond to front end
// var corsOptions = {
//   origin: './',
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
console.log('in app.js of server');

// TODO error handling code is buggy
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log('IN APP.JS error catcher');
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // console.log('IN APP.JS error handler');
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500);
  // res.json({ message: 'error' });
});

module.exports = app;
