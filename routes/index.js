var express = require('express');
var passport = require('passport');
var moment = require('moment');
var LocalStrategy = require('passport-local').Strategy;
var Auth = require('../config/env/acl/middlewares/authorization.js');
var datatablesQuery = require('datatables-query');
var User = require("../models/user");


module.exports = function(app, passport, i18n)
{
//Storage of files and avatar
var multer = require('multer');
var storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/avatar/');
  },
  filename: function (req, file, cb) {
    var url = file.originalname;
    var ext = (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).substr(url.lastIndexOf("."));
    cb(null, req.user.id+ext);
  }
})

var storageMemory = multer.memoryStorage();

var uploadAvatar = multer({ storage: storageMemory});
/* To disable title in page set "showtitle" to none // extends display:*/
/**
 *
 * ####################### Basic ROUTES ###################
 *
 *
 */

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('bodies/index', { title: 'Plexus!',
                                 subtitle: 'connecting data',
                                 showtitle: '',
                                 layout: 'layouts/default'
                               });      
});
/**
 * Terms and FAQ Routes
 */
app.get('/terms', function(req, res, next) {
  res.render('bodies/terms', { title: 'Terms and Conditions!',
                        subtitle: 'These are our terms, just accept it',
                        showtitle: '',
                        layout: 'layouts/default'
                      });
});

app.get('/faq', function(req, res, next) {
  res.render('bodies/faq', { title: 'Frequent Asked Questions!',
                        subtitle: 'Don\'t ask, just read',
                        showtitle: '',
                        layout: 'layouts/default'
                      });  
});
/**
 *
 *
 *
 * ####################### ADMIN ROUTES ###################
 *
 *
 *
 *
 */
app.get('/manage_users', function(req, res, next) {
  if(req.isAuthenticated()){
    
    Role.find({}, 'name id', function(err, roles){
        if(err)
        {
          console.log(err);
        } 
        else
        {
        res.render('admin/index', { title: 'Users!',
                                    subtitle: 'Management',
                                    showtitle: '',
                                    layout: 'layouts/sidebar',
                                    user: req.user,
                                    roles:roles
                                });
        }
    });

  }
  else
  {
  res.redirect('/login');
  }
});
//Get user for update
app.post('/get-user/:id',function(req,res){ 
  User.findOne({ _id : req.params.id },'name email role acl.status', function(error, user) {
    if (error || !user) 
    {
      res.status(500).json(err);
    } 
    else 
    { 
      res.json(user);
    }
 });
});

//Create user
app.post('/create-user',function(req,res){ 
    User.createACLUser(req,req.body.user_name,req.body.user_email,req.body.user_role,req.body.user_status, function(err, user){ if(err) throw err;  });
    res.redirect('back');
 });
 //Update user
app.post('/update-user/:id',function(req,res){ 
    User.findACLUserAndUpdate(req,req.params.id,req.body.user_name,req.body.user_email,req.body.user_role,req.body.user_status, function(err, user){ if(err) throw err;  });
    res.redirect('back');
 });
//Create Role
app.post('/create-role',function(req,res){ 
   Role.newRole(req,req.body.role_name,req.body.role_read,req.body.role_write,req.body.role_edit,req.body.role_del,req.body.role_publish, function(err, role){ if(err) throw err;  });
   res.redirect('back');
 });
//Update Role
app.post('/update-role/:id',function(req,res){ 
   Role.findRoleAndUpdate(req,req.param.id,req.body.role_name,req.body.role_read,req.body.role_write,req.body.role_edit,req.body.role_del,req.body.role_publish, function(err, role){ if(err) throw err;  });
   res.redirect('back');
 });
//Datatable getAllRoles
app.post('/get_roles', function(req, res, next) {
  var params = req.body;
  var query = datatablesQuery(Role);
  query.run(params).then(function(data){
                                            res.json(data);
                                        }, function (err) {
                                            res.status(500).json(err);
                                        });
});
//Datatable getAllUsers
app.post('/get_users', function(req, res, next) {
  var params = req.body;
  var query = datatablesQuery(User);
  query.run(params).then(function(data){
                                            res.json(data);
                                        }, function (err) {
                                            res.status(500).json(err);
                                        });
});
//Main Settings Page
app.get('/settings', function(req, res, next){
  if(req.isAuthenticated()){
    
    res.render('admin/settings', { title: 'Settings!',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/sidebar',
                              user: req.user
                            });
  }
  else
  {
  res.redirect('/login');
  }
});

/**
 *
 *
 *
 * ####################### USER ROUTES ###################
 *
 *
 *
 *
 */
app.get('/user/profile',Auth.isAuthenticated, function(req, res, next) {
    if(req.isAuthenticated()){


    res.render('user/profile', { title: 'Profile!',
                               user: req.user,
                               birthday: moment(req.user.birthday).format('YYYY-MM-DD'),
                               subtitle: 'Welkom Jelmer Stoker',
                               showtitle: 'none',
                               layout: 'layouts/sidebar'
                              });
  }
  else
  {
  res.redirect('/login');
  }
});
//Update user profile
app.post('/update-profile/:id',function(req,res) { 
  User.findUserAndUpdate(req,req.params.id,req.body.name,req.body.personal_quote,req.body.personal_info,req.body.birthday,req.body.address,req.body.postalcode,req.body.city,req.body.country,req.body.email,req.body.phone,req.body.website, function(err, user){ if(err) throw err;  });
    res.redirect('back');
 });
//Update avatar user
app.post('/update-avatar/:id',uploadAvatar.single('avatar'),function(req,res) {

    var newfilename = req.params.id+'-' + moment().format('X') + '.jpg';

    User.findAvatarAndUpdate(req.file,req.body, req.params.id, newfilename, function(err, file){ if(err) throw err; });
    res.json(newfilename).status(204).end();
 });
//User settings
app.get('/user/settings',Auth.isAuthenticated, function(req, res, next){
    if(req.isAuthenticated()){
    
    res.render('user/settings', { title: 'Settings!',
                               user: req.user,
                               subtitle: '',
                               showtitle: 'none',
                               layout: 'layouts/sidebar'
                              });
  }
  else
  {
  res.redirect('/login');
  }
});
//Change language
app.get('/setlocale/:locale', function (req, res) {
   app.locals.locale =  req.params.locale;
    res.redirect("back");
});
/**
 *
 *
 *
 * ACL Routes Register,Login,Lock,Logout
 * 
 * 
 * 
 */
//Register views 
app.get('/register', function(req, res) {
    res.render('acl/login', { title: '',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/default' 
                             });
});

app.post('/register', Auth.userExist, function(req, res, next) 
{
  User.signup(req,req.body.fullname,req.body.email, req.body.password, function(err, user){
    if(err) throw err;
                                                                      req.login(user, function(err)
                                                                      {
                                                                        if(err) return next(err);
                                                                        return res.redirect('user/profile');
                                                                      });
                                                                    });
});
//Login
app.get('/login', function(req, res) {
    res.render('acl/login', { user : req.user,
                              title: '',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/default' 
                            });
});
app.post("/login" ,passport.authenticate('local',{
                                                    successRedirect : "/user/profile",
                                                    failureRedirect : "/login",
                                                    failureFlash: true
                                                  })
);
//Logout
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});
//Lock
app.get('/acl/lock', function(req, res, next) {
  res.render('acl/lock', { title: '',
                        subtitle: '',
                        user: req.user,
                        showtitle: 'none',
                        layout: 'layouts/default'
                      });
});


}

