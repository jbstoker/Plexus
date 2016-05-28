var express = require("express"),
passport = require("passport"),
moment = require("moment"),
LocalStrategy = require("passport-local").Strategy,
Auth = require("../config/env/acl/middlewares/authorization.js"),
datatablesQuery = require("../middlewares/datatables/query"),
User = require("../models/user"),
Role = require("../models/role");

module.exports = function(app, passport, i18n) {
    //Storage of files and avatar
    var multer = require("multer");
    var storageDisk = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./public/uploads/avatar/");
        },
        filename: function(req, file, cb) {
            var url = file.originalname;
            var ext = (url = url.substr(1 + url.lastIndexOf("/")).split("?")[0]).substr(url.lastIndexOf("."));
            cb(null, req.user.id + ext);
        }
    });
    var storageMemory = multer.memoryStorage();
    var uploadAvatar = multer({
        storage: storageMemory
    });
/** Data Checks */
function onlyLetters(str) 
{
    if(str.length > 0)
    {
      return /^[a-zA-Z]+$/.test(str);
    }
    else
    {
        return true;
    }    
}

function onlyNumbers(str) 
{   
    if(str.length > 0)
    {
      return /^[0-9]+$/.test(str);
    }
    else
    {
        return true;
    }    
}

function onlyLettersNumbers(str) 
{
    if(str.length > 0)
    {
        return /^[a-zA-Z0-9]+$/.test(str);
    }
    else
    {
        return true;
    }    
}
/**
 *
 *
 *
 * ####################### USER ROUTES ###################
 *
 *
 *
 *
 */
    app.get("/user/profile", Auth.isAuthenticated, function(req, res, next) {
        if (req.isAuthenticated()) {
            res.render("user/profile", {
                title: "Profile!",
                user: req.user,
                birthday: moment(req.user.birthday).format("YYYY-MM-DD"),
                subtitle: "Welkom Jelmer Stoker",
                showtitle: "none",
                layout: "layouts/sidebar",
                backend:true
            });
        } else {
            res.redirect("/login");
        }
    });
    //Update user profile
    app.post("/update-profile/:id", function(req, res){
            //Check names for only letters
            if(onlyLetters(req.body.surname) && onlyLetters(req.body.middlename) && onlyLetters(req.body.lastname) && onlyLetters(req.body.maidenname))
            {
                if(onlyNumbers(req.body.phone) && onlyNumbers(req.body.mobile))
                {
                    // addresscheck
                    if(onlyLetters(req.body.address) && onlyLettersNumbers(req.body.number))
                    {
                        if(onlyLetters(req.body.city) && onlyLetters(req.body.country))
                        {
                            User.findUserAndUpdate(req.params.id, req.body, function(err, user)
                            {
                                if (err)
                                {
                                    req.flash('error',{title:'Error!',msg:'Could not update your profile!',target:'',url:'',target:'',bar:false});
                                } 
                                else 
                                {
                                    req.flash('success',{title:'Success!',msg:'Profile updated!',target:'',url:'',target:'',bar:false});
                                }
                                res.redirect("back");
                            });
                        }
                        else
                        {
                            req.flash('error',{title:'Error!',msg:'Cities and Countries are always with letters right?!',target:'',url:'',target:'',bar:false});
                            res.redirect('back');
                        }    

                    }
                    else
                    {
                        req.flash('error',{title:'Error!',msg:'Please check your address!',target:'',url:'',target:'',bar:false});
                        res.redirect('back');
                    }    
                }
                else
                {
                req.flash('error',{title:'Error!',msg:'Phone numbers need both to contain only numbers!',target:'',url:'',target:'',bar:false});
                res.redirect("back");
                }    
            }
            else    
            {
                req.flash('error',{title:'Error!',msg:'Name needs to contain only letters!',target:'',url:'',target:'',bar:false});
                res.redirect("back");
            }    
    });
    //Update avatar user
    app.post("/update-avatar/:id", uploadAvatar.single("avatar"), function(req, res) {
        var newfilename = req.params.id + "-" + moment().format("X") + ".jpg";
        User.findAvatarAndUpdate(req.file, req.body, req.params.id, newfilename, function(err, file) {
             if (err){
                        req.flash('error',{title:'Error!',msg:'Could replace your avatar!',target:'',url:'',target:'',bar:false});
                    } 
                    else 
                    {
                        req.flash('success',{title:'Success!',msg:'Avatar replaced!',target:'',url:'',target:'',bar:false});
                    }
        });
        res.json(newfilename).status(204).end();
    });
    //User settings
    app.get("/user/settings", Auth.isAuthenticated, function(req, res, next) {
        if (req.isAuthenticated()) {
            res.render("user/settings", {
                title: "Settings!",
                user: req.user,
                subtitle: "",
                showtitle: "none",
                layout: "layouts/sidebar",
                backend:true
            });
        } else {
            res.redirect("/login");
        }
    });
    //Change language
    app.get("/setlocale/:locale", function(req, res) 
    {
        app.locals.locale = req.params.locale;
        User.setLocale(req.user.uid,req.params.locale, function(err, locale){
            if(err)
            {
                req.flash('error',{title:'Error!',msg:'Your preffered languages failed to set to '+req.params.locale ,target:'',url:'',target:'',bar:false});
                res.redirect("/user/settings");
            }
            else
            {
                req.flash('info',{title:'Info!',msg:'Your language is set to '+req.params.locale,target:'',url:'',target:'',bar:false});
                res.redirect("/user/settings");
            }    
        });

    });
//post pin
    app.post("/checkpin", function(req, res, next) 
    {
        User.getByDocumentId(req.body.uid, function(err, user){
            if(!user)
            {   
                if(!err)
                {
                    res.json({message:{type:'error',title:'Error!',msg:'Your call is missing the uid parameters',target:'',url:'',target:'',bar:false}});
                }
                else    
                {
                    res.json({message:{type:'error',title:'Error!',msg:err.message,target:'',url:'',target:'',bar:false}});
                }
            }
            else
            {
                if(user.pin === req.body.pin)
                {
                    req.flash('success',{title:'Success!',msg:'Welcome back',target:'',url:'',target:'',bar:false});
                    res.redirect('/user/profile');
                }
                else
                {
                    res.json({message:{type:'warning',title:'Pincode Failed!',msg:'Your entered pincode doesn\'t match, try again!',target:'',url:'',target:'',bar:false}});
                }    
            }    
        });
    });

    //post pin
    app.post("/access-check", function(req, res, next) 
    {
        User.doAccessCheck(req.body, function(err, user)
        {   
                if(!err)
                {
                        if(req.user.uid === user)
                        {
                            res.json({message:{type:'success',title:'Logged In!',msg:'Login Correct!',target:'',url:'',target:'',bar:false}});    
                        }   
                        else
                        {
                            res.json({message:{type:'danger',title:'Error!',msg:user,target:'',url:'',target:'',bar:false}});    
                        }     
                }
                else    
                {
                    res.json({message:{type:'danger',title:'Error!',msg:err.message,target:'',url:'',target:'',bar:false}});
                }
        });
    });
};