var User = require('../../../../models/user');

exports.isAuthenticated = function(req, res, next)
{
        if (req.isAuthenticated())
        {
            next();
        } 
        else 
        {
            req.flash('error',{title:'Session Closed!',msg:'Your session was closed, Please login again.',target:'',url:'',target:'',bar:false});
            res.redirect("/login");
        }
}

exports.userExist = function(req, res, next) 
{
    User.findByEmail(req.body.email, function(err, email)
    {
    if(err){ throw err; }
                
        if(email.length > 0)
        {
            req.flash('error',{title:'Error!',msg:'The email address already exists',target:'',url:'',target:'',bar:false});
            res.redirect("/register");   
        }
        else 
        {
            next();
        }
    });
}

