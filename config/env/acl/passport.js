var LocalStrategy = require('passport-local').Strategy
  , User = require('../../../models/user');


module.exports = function (passport, config) {


passport.serializeUser(function(user, done) {
    done(null, user[0].users.uid);
});
 
passport.deserializeUser(function(userId, done) {
    User.getByDocumentId(userId,function(err, user)
    {
        done(null, user[0].users);
    });
});

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
    },
    function(req, email, password, done) 
    {
    	User.isValidUserPassword(req, email, password, done);
    }));
}
