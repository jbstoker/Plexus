var ottoman = require('ottoman')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../../../models/user');


module.exports = function (passport, config) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});

  	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
    },
    function(req, email, password, done) {
    	User.isValidUserPassword(req, email, password, done);
    }));
}
