/* 
* @Project:   PlexusMain
* -------------------------------------------
* @Author:    JB Stoker
* @Email:     Jelmer@probo.nl
*
* @File:    app.js
* @Path:    C:\PrivateProjects\PlexusMain\app.js
* @Created:     2015-11-10
*
* @Modified by: JB Stoker at 2015-12-06
* 
* @Copyright: Copyright (C) Probo - All Rights Reserved 
*       Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*       Proprietary and confidential
*/            
//Node modules
var fs = require('fs'),express = require('express'),path = require('path'),favicon = require('serve-favicon'),logger = require('morgan'),hbs = require('hbs'),cookieParser = require('cookie-parser'),bodyParser = require('body-parser'),mongo = require('mongoose'),passport = require('passport'),redis = require('redis'),i18n = require('i18n');                                                   
//Set Config
var env = process.env.NODE_ENV || 'development', config = require('./config/env/config')[env];
//Include models
var models_dir = __dirname + '/models';
fs.readdirSync(models_dir).forEach(function(file){ if(file[0] === '.') return; require(models_dir+'/'+ file); });
//passport config
require('./config/env/acl/passport')(passport, config)
// Set languages
i18n.configure(config.i18n);
//Databases and Caching
mongo.connect(config.db, function(err){ if (err){ console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!'); }});
var client = redis.createClient();
client.on("error", function (err){ console.log("Error " + err); });
//Init express
var app = express();
app.use(i18n.init);  
//View engine hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//navigation urls + custom hbs helpers
var navigation = require('./config/env/navigation/navigation')(i18n);
app.locals.nav = navigation;
require('./config/env/navigation/helpers')(hbs);
//favicon Uri
app.use(favicon(path.join(__dirname, 'public/images/favicons/', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
//Set Partials hbs
hbs.registerPartials(__dirname + '/views/layouts/partials');
// set default locale for hbs fix
app.locals.locale = i18n.getLocale();
// register hbs helpers that still receive the current context as the `this`, but `i18n.__` will take `app.locals` as the `this`
hbs.registerHelper('__', function(){ return i18n.__.apply(app.locals, arguments); });
hbs.registerHelper('__n', function(){ return i18n.__n.apply(app.locals, arguments); });
//Log init
app.use(logger('dev'));
//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Session middleware
app.use(cookieParser());
app.use(require('express-session')(config.secret));
//Autentication
app.use(passport.initialize());
app.use(passport.session());
//Use language
app.use(function (req, res, next){ 
                                    res.locals.loggedin = req.isAuthenticated(); 
                                    res.locals.modules = config.modules; 
                                    next(); 
                                  });
//Regiser routes       
require('./routes/index')(app, passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) 
{ 
  var err = new Error('Not Found'); 
  err.status = 404; 
  next(err); 
});
//Development error handler
if (app.get('env') === 'development') 
{
  app.use(function(err, req, res, next) 
  {
    res.status(err.status || 500);
    res.render('error', {
                          message: err.message,
                          error: err
                        });
  });
}
//Production error handler
app.use(function(err, req, res, next) 
{
  res.status(err.status || 500);
  res.render('error', {
                        message: err.message,
                        error: {}
                      });
});
module.exports = app;