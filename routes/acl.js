var express = require("express"),
passport = require("passport"),
moment = require("moment"),
LocalStrategy = require("passport-local").Strategy,
Auth = require("../config/env/acl/middlewares/authorization.js"),
datatablesQuery = require("../middlewares/datatables/query"),
User = require("../models/user"),
Role = require("../models/role");

module.exports = function(app, passport, i18n) {
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
    app.get("/register", function(req, res) {
        res.render("acl/login", {
            title: "",
            subtitle: "",
            showtitle: "",
            layout: "layouts/default"
        });
    });
    app.post("/register", Auth.userExist, function(req, res, next) {
        User.createOrUpdate(null, req.body, function(err, user)
        {
            if (err){
                        req.flash('error',{title:'Error!',msg:'Could not create your new account!',target:'',url:'',target:'',bar:false});
                        res.redirect("back");
                    } 
                    else 
                    {
                        req.login(user, function(err) 
                        {
                            if(err)
                            {
                              req.flash('error',{title:'Error!',msg:err,target:'',url:'',target:'',bar:false});  
                              res.redirect("back");
                            } 
                            else
                            {
                              req.flash('success',{title:'',msg:'Please add the missing data to your profile!',target:'',url:'',target:'',bar:false});
                              res.redirect("user/profile");
                            }    
                        });
                    }
        });
    });
    //Login
    app.get("/login", function(req, res) {
        res.render("acl/login", {
            user: "",
            title: "",
            subtitle: "",
            showtitle: "",
            layout: "layouts/default"
        });
    });


app.post('/login', passport.authenticate('local', { 
                                                    failureRedirect: '/login', 
                                                    successRedirect: '/user/profile',  
                                                    successFlash: true, 
                                                    failureFlash: true, 
                                                  }));

      //Logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/login");
    });
    //Lock
    app.get("/lock", function(req, res, next) {
        if(req.user.pin.length > 0)
        {
            if(req.user != undefined && req.user.uid.length > 0)
            {
                res.render("acl/lock", {
                    title: "",
                    subtitle: "",
                    user: req.user,
                    showtitle: "none",
                    layout: "layouts/clean"
                });
            }
            else
            {
               res.redirect("/login"); 
            }  
        }
        else
        {
            req.flash('warning',{title:'Pincode fail!',msg:'You need to set an pincode before you can lock your session!',target:'',url:'',target:'',bar:false});
            res.redirect('back');
        }    

    });
    //Update user profile
    app.post("/contact", function(req, res) {
        User.ContactMail(req.body, function(err, user) {
             if (err){
                        req.flash('error',{title:'Error!',msg:'Could not send your message, please try again!',target:'',url:'',target:'',bar:false});
                    } 
                    else 
                    {
                        req.flash('success',{title:'Success!',msg:'Message Send!',target:'',url:'',target:'',bar:false});
                    }
        res.redirect("back");
        });
    });
};
