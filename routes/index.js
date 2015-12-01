var express = require('express');
var router = express.Router();
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
                             layout: 'layouts/default'
                           });
});

/* GET icons page. */
router.get('/icons', function(req, res, next) {
  res.render('bodies/icons' , { title: 'Icons!',
                         subtitle: 'Many icons in SVG format',
                         showtitle: '',
                         layout: 'layouts/default'
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
 * Acces Routes
 */
router.get('/login', function(req, res, next) {
  res.render('acl/login', { title: '',
                        subtitle: '',
                        showtitle: '',
                        layout: 'layouts/clean'
                      });
});


/* User Routes */
router.get('/user/lock', function(req, res, next) {
  res.render('user/lock', { title: '',
                        subtitle: '',
                        showtitle: 'none',
                        layout: 'layouts/clean'
                      });
});

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
                        layout: 'layouts/clean'
                      });
});

router.get('/faq', function(req, res, next) {
  res.render('admin/faq', { title: 'Frequent Asked Questions!',
                        subtitle: 'Don\'t ask, just read',
                        showtitle: '',
                        layout: 'layouts/clean'
                      });  
});



module.exports = router;
