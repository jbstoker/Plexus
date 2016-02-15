var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Auth = require('../config/env/acl/middlewares/authorization.js');

module.exports = function(app, passport,i18n)
{

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
    
    res.render('admin/index', { title: 'Users!',
                              subtitle: 'Management',
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
//Create user
app.post('/create-user/:id',function(req,res){ 
  
    res.redirect('back');
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
app.post('/update-user/:id',function(req,res) { 
  User.findUserAndUpdate(req.params.id,req.body.name,req.body.personal_quote,req.body.personal_info,req.body.birthday,req.body.address,req.body.postalcode,req.body.city,req.body.country,req.body.email,req.body.phone,req.body.website, function(err, user){ if(err) throw err; console.log(user);  });

    res.redirect('back');
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
  User.signup(req.body.email, req.body.password, function(err, user){if(err) throw err;
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
                                                    failureFlash: true,
                                                    successFlash: 'Welcome!',
                                                    failureRedirect : "/login",
                                                    failureFlash: 'Invalid username or password.'
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
                        showtitle: 'none',
                        layout: 'layouts/default'
                      });
});


}

