var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongoskin');
//var redis = require('redis');
var i18n = require('i18n');
//Fetch routes
var routes = require('./routes/index');
var users = require('./routes/users');

// databases and caching
//var client = redis.createClient();
//var db = mongo.db("mongodb://localhost:27017/plexus", {native_parser:true});

// Set languages
i18n.configure({
    locales:['en', 'nl'],
    directory:__dirname + "/locales/",
    defaultLocale:'en',
    cookie:'language',
    updateFiles: true,
    extension: '.js',
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// register hbs helpers in res.locals' context which provides this.locale
hbs.registerHelper('__', function () 
{
  return i18n.__.apply(this, arguments);
});

hbs.registerHelper('__n', function () 
{
  return i18n.__n.apply(this, arguments);
});

app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Routes
app.use('/', routes);
app.use('/users', users);
app.use(i18n.init);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
// // error handlers
//    client.on("error", function (err) {
//    res.send("Redis server cannot be reached"); 
//    });
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
