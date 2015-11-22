var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/components', function(req, res, next) {
  res.render('components', { title: 'Plexus!' });
});

/* GET home page. */
router.get('/icons', function(req, res, next) {
  res.render('icons', {
  						layout: 'layouts/sidebar'
  					  });
});

module.exports = router;
