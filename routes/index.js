var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Auth = require('../config/env/middlewares/authorization.js');

module.exports = function(app, passport)
{

/* To disable title in page set "showtitle" to none // extends display:*/

/**
 *
 *
 *
 * ####################### DEMO ROUTES ###################
 *
 *
 *
 *
 */
/* GET components page. */
app.get('/components', function(req, res, next) {
  res.render('bodies/components', { title: 'Components!',
                             subtitle: 'Preview some components',
                             showtitle: '',
                             layout: 'layouts/topnav-public'
                           });
});

/* GET icons page. */
app.get('/icons', function(req, res, next) {
  res.render('bodies/icons' , { title: 'Icons!',
                         subtitle: 'Many icons in SVG format',
                         showtitle: '',
                         layout: 'layouts/topnav-public'
                      });
});

/* GET left-sidebar demo page. */
app.get('/left-sidebar', function(req, res, next) {
  res.render('bodies/index', { title: 'Left Sidebar!',
                        subtitle: 'left sidebar demo page',
                        showtitle: '',
  							        layout: 'layouts/sidebar-left'
  						 	      });
});

/* GET left-sidebar demo page. */
app.get('/right-sidebar', function(req, res, next) {
  res.render('bodies/index', { title: 'Right Sidebar!',
                        subtitle: 'right sidebar demo page',
                        showtitle: '',
                        layout: 'layouts/sidebar-right'
                      });
});

/* GET clean demo page. */
app.get('/clean', function(req, res, next) {
  res.render('bodies/index', { title: 'Clean!',
                        subtitle: 'Clean view with no menus',
                        showtitle: '',
                        layout: 'layouts/topnav-public'
                      });
});
/**
 *
 * ####################### END DEMO ROUTES ###################
 *
 *
 */

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('bodies/index', { title: 'Plexus!',
                                 subtitle: 'connecting data',
                                 showtitle: '',
                                 layout: 'layouts/topnav-public'
                               });      
});
/**
 * Terms and FAQ Routes
 */
app.get('/terms', function(req, res, next) {
  res.render('admin/terms', { title: 'Terms and Conditions!',
                        subtitle: 'These are our terms, just accept it',
                        showtitle: '',
                        layout: 'layouts/topnav-public'
                      });
});

app.get('/faq', function(req, res, next) {
  res.render('admin/faq', { title: 'Frequent Asked Questions!',
                        subtitle: 'Don\'t ask, just read',
                        showtitle: '',
                        layout: 'layouts/topnav-public'
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
    
    res.render('acl/index', { title: 'Users!',
                              subtitle: 'Management',
                              showtitle: '',
                              layout: 'layouts/sidebar-left',
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
                               layout: 'layouts/sidebar-left'
                              });
  }
  else
  {
  res.redirect('/login');
  }
});

app.get('/user/calendar', function(req, res, next) {
    if(req.isAuthenticated()){
    
    res.render('user/calendar', { title: 'Calendar!',
                        subtitle: 'Welkom Jelmer Stoker',
                        showtitle: '',
                        layout: 'layouts/sidebar-left',
                        user:req.user
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
                              layout: 'layouts/topnav-public' 
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
                              layout: 'layouts/topnav-public' 
                            });
});

app.post("/login" ,passport.authenticate('local',{
                                                    successRedirect : "/user/profile",
                                                    failureRedirect : "/login",
                                                  })
);
/**
 * Social Authentiction
 */
app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));

app.get("/auth/facebook/callback", passport.authenticate("facebook",{ failureRedirect: '/login'}),
  function(req,res){
    res.render("profile", {user : req.user});
  }
);

app.get('/auth/google', passport.authenticate('google',{
                                                          scope: [
                                                          'https://www.googleapis.com/auth/userinfo.profile',
                                                          'https://www.googleapis.com/auth/userinfo.email'
                                                          ]
                                                        })
                                                      );

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
                                                                                                                      // Successful authentication, redirect home.
                                                                                                                      res.redirect('/');
                                                                                                                    });
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
app.get('/user/lock', function(req, res, next) {
  res.render('user/lock', { title: '',
                        subtitle: '',
                        showtitle: 'none',
                        layout: 'layouts/topnav-public'
                      });
});


}

