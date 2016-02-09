var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Auth = require('../config/env/acl/middlewares/authorization.js');

module.exports = function(app, passport)
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
 * ####################### ACL ROUTES ###################
 *
 *
 *
 *
 */
/**
 *  Management Routes
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
app.get('/settings', function(req, res, next) {
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

/* User Routes */
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

app.get('/user/settings',Auth.isAuthenticated, function(req, res, next) {
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




/**
 * ACL Routes Register
 */
app.get('/register', function(req, res) {
    res.render('acl/login', { title: '',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/default' 
                             });
});

app.post('/register', Auth.userExist, function(req, res, next) 
{
  User.signup(req.body.email, req.body.password, function(err, user){
                                                                      if(err) throw err;
                                                                      
                                                                      req.login(user, function(err)
                                                                      {
                                                                        if(err) return next(err);
                                                                        return res.redirect('user/profile');
                                                                      });
                                                                    });
});
/**
 * ACL Routes Login
 */
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
                                                  })
);
// /**
//  * Social Authentiction
//  */
// app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));

// app.get("/auth/facebook/callback", passport.authenticate("facebook",{ failureRedirect: '/login'}),
//   function(req,res){
//     res.render("profile", {user : req.user});
//   }
// );

// app.get('/auth/google', passport.authenticate('google',{
//                                                           scope: [
//                                                           'https://www.googleapis.com/auth/userinfo.profile',
//                                                           'https://www.googleapis.com/auth/userinfo.email'
//                                                           ]
//                                                         })
//                                                       );

// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
//                                                                                                                       // Successful authentication, redirect home.
//                                                                                                                       res.redirect('/');
//                                                                                                                     });
/**
 * ACL Routes Logout
 */
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });
/**
 * ACL Routes Lock User
 */
app.get('/acl/lock', function(req, res, next) {
  res.render('acl/lock', { title: '',
                        subtitle: '',
                        showtitle: 'none',
                        layout: 'layouts/default'
                      });
});


}

