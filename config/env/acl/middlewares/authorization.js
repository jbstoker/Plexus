var User = require('../../../../models/user');

exports.isAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}

exports.userExist = function(req, res, next) {
User.findByEmail(req.body.email, function(err, email){
if(err){ throw err; }
            
            if(email.length > 0) {
                res.redirect("/register");
               
            } else {
                next();
            }
        });


}

