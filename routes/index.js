var express = require('express');
var passport = require('passport');
var Account = require('../models/user');
var Auth = require('../config/env/middlewares/authorization.js');
var router = express.Router();

//** New Routes
//
//
module.exports = function(app, passport){
  app.get("/", function(req, res){ 
    if(req.isAuthenticated()){
      res.render("home", { user : req.user}); 
    }else{
      res.render("home", { user : null});
    }
  });

  app.get("/login", function(req, res){ 
    res.render("login");
  });

  app.post("/login" 
    ,passport.authenticate('local',{
      successRedirect : "/",
      failureRedirect : "/login",
    })
  );

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.post("/signup", Auth.userExist, function (req, res, next) {
    User.signup(req.body.email, req.body.password, function(err, user){
      if(err) throw err;
      req.login(user, function(err){
        if(err) return next(err);
        return res.redirect("profile");
      });
    });
  });

  app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
  app.get("/auth/facebook/callback", 
    passport.authenticate("facebook",{ failureRedirect: '/login'}),
    function(req,res){
      res.render("profile", {user : req.user});
    }
  );

  app.get('/auth/google',
    passport.authenticate(
      'google',
      {
        scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
        ]
      })
    );

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  app.get("/profile", Auth.isAuthenticated , function(req, res){ 
    res.render("profile", { user : req.user});
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });
}



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
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('bodies/index', { title: 'Plexus!',
                        subtitle: 'connecting data',
                        showtitle: '',
                        layout: 'layouts/default'
                      });
});

/* GET components page. */
router.get('/components', function(req, res, next) {
  res.render('bodies/components', { title: 'Components!',
                             subtitle: 'Preview some components',
                             showtitle: '',
                             layout: 'layouts/sidebar-left'
                           });
});

/* GET icons page. */
router.get('/icons', function(req, res, next) {
  res.render('bodies/icons' , { title: 'Icons!',
                         subtitle: 'Many icons in SVG format',
                         showtitle: '',
                         layout: 'layouts/sidebar-left'
                      });
});

/* GET left-sidebar demo page. */
router.get('/left-sidebar', function(req, res, next) {
  res.render('bodies/index', { title: 'Left Sidebar!',
                        subtitle: 'left sidebar demo page',
                        showtitle: '',
  							        layout: 'layouts/sidebar-left'
  						 	      });
});

/* GET left-sidebar demo page. */
router.get('/right-sidebar', function(req, res, next) {
  res.render('bodies/index', { title: 'Right Sidebar!',
                        subtitle: 'right sidebar demo page',
                        showtitle: '',
                        layout: 'layouts/sidebar-right'
                      });
});

/* GET topnav-user demo page. */
router.get('/topnav-user', function(req, res, next) {
  res.render('bodies/index', { title: 'Top navigation with user menu!',
                        subtitle: 'topmenu and user demo page',
                        showtitle: '',
                        layout: 'layouts/topnav-user'
                      });
});

/* GET clean demo page. */
router.get('/clean', function(req, res, next) {
  res.render('bodies/index', { title: 'Clean!',
                        subtitle: 'Clean view with no menus',
                        showtitle: '',
                        layout: 'layouts/clean'
                      });
});
/**
 *
 * ####################### END DEMO ROUTES ###################
 *
 *
 */


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
router.get('/manage_users', function(req, res, next) {
  res.render('acl/index', { title: 'Users!',
                        subtitle: 'Management',
                        showtitle: '',
                        layout: 'layouts/sidebar-left'
                      });
});
/**
 * ACL Routes Register
 */
 router.get('/register', function(req, res) {
    res.render('acl/login', { title: '',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/clean' 
                             });
});
router.post('/register', function(req, res, next) 
{
  console.log('registering user');
  Account.register(new Account({username: req.body.email}), req.body.password, function(err) 
  {
    if (err) 
    {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');
    res.redirect('/user/profile');
  });
});
/**
 * ACL Routes Login
 */
router.get('/login', function(req, res) {
    res.render('acl/login', { user : req.user,
                              title: '',
                              subtitle: '',
                              showtitle: '',
                              layout: 'layouts/clean' 
                            });
});
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});
/**
 * ACL Routes Logout
 */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
/**
 * ACL Routes Lock User
 */
router.get('/user/lock', function(req, res, next) {
  res.render('user/lock', { title: '',
                        subtitle: '',
                        showtitle: 'none',
                        layout: 'layouts/clean'
                      });
});

















/* User Routes */
router.get('/user/profile', function(req, res, next) {
  res.render('user/profile', { title: 'Profile!',
                        subtitle: 'Welkom Jelmer Stoker',
                        showtitle: 'none',
                        layout: 'layouts/sidebar-left'
                      });
});

router.get('/user/calendar', function(req, res, next) {
  res.render('user/calendar', { title: 'Calendar!',
                        subtitle: 'Welkom Jelmer Stoker',
                        showtitle: '',
                        layout: 'layouts/sidebar-left'
                      });
});

/**
 * Terms and FAQ Routes
 */
router.get('/terms', function(req, res, next) {
  res.render('admin/terms', { title: 'Terms and Conditions!',
                        subtitle: 'These are our terms, just accept it',
                        showtitle: '',
                        layout: 'layouts/sidebar-left'
                      });
});

router.get('/faq', function(req, res, next) {
  res.render('admin/faq', { title: 'Frequent Asked Questions!',
                        subtitle: 'Don\'t ask, just read',
                        showtitle: '',
                        layout: 'layouts/sidebar-left'
                      });  
});



module.exports = router;
