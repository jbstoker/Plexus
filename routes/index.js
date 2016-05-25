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
    /* To disable title in page set "showtitle" to none // extends display:*/
    /**
 *
 * ####################### Basic ROUTES ###################
 *
 *
 */
    /* GET home page. */
    app.get("/", function(req, res, next) {
        res.render("bodies/index", {
            title: "Plexus!",
            subtitle: "connecting data",
            showtitle: "",
            layout: "layouts/default"
        });
    });
    /**
 * Terms and FAQ Routes
 */
    app.get("/terms", function(req, res, next) {
        res.render("bodies/terms", {
            title: "Terms and Conditions!",
            subtitle: "These are our terms, just accept it",
            showtitle: "",
            layout: "layouts/default"
        });
    });
    app.get("/faq", function(req, res, next) {
        res.render("bodies/faq", {
            title: "Frequent Asked Questions!",
            subtitle: "Don't ask, just read",
            showtitle: "",
            layout: "layouts/default"
        });
    });
/**
 *
 *
 *
 * ####################### ADMIN ROUTES ###################
 *
 *
 *
 *
 */
    app.get("/manage_users", function(req, res, next) {
        if (req.isAuthenticated()) {
            Role.getAllRoles(function(err, roles) {
                if (err) {
                    return err;
                } else {
                    res.render("admin/index", {
                        title: "Users!",
                        subtitle: "Management",
                        showtitle: "",
                        layout: "layouts/sidebar",
                        user: req.user,
                        roles: roles
                    });
                }
            });
        } else {
            res.redirect("/login");
        }
    });
    //Get user for update
    app.post("/sendmail", function(req, res) {
        User.SendMail(req.body.to,req.body,function(err,user){
            if (err){
                        res.json({uid:user.id,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not send the email!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({uid:user.id,message:{type:'success',title:'<strong>Succes!</strong>',msg:'Email is send!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Get user for update
    app.post("/get-user/:id", function(req, res) {
        User.getByDocumentId(req.params.id, function(err, user) {
            if (err || !user) {
                res.status(500).json(err);
            } else {
                res.json(user);
            }
        });
    });
    //delete user
    app.post("/delete-user/:id", function(req, res) {
        User.DeleteUser(req.params.id, function(err, user) {
            if (err){
                        res.json({uid:req.params.id,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not remove the user!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({uid:req.params.id,message:{type:'success',title:'<strong>Succes!</strong>',msg:'User is removed!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Create user
    app.post("/create-user", function(req, res) {
        User.createACLUser(req.body, function(err, user) {
            if (err){
                        res.json({user:user,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not create the user!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({user:user,message:{type:'success',title:'<strong>Succes!</strong>',msg:'User is created!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Update user
    app.post("/update-user/:id", function(req, res) {
        User.findACLUserAndUpdate(req.params.id, req.body, function(err, user) {
            if (err){
                        res.json({user:user,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not update the user!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({user:user,message:{type:'success',title:'<strong>Succes!</strong>',msg:'User is updated!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Get role for update
    app.post("/get-role/:id", function(req, res) {
        Role.getByDocumentId(req.params.id, function(err, role) {
            if (err || !role) {
                res.status(500).json(err);
            } else {
                res.json(role);
            }
        });
    });
    //delete role
    app.post("/delete-role/:id", function(req, res) {
        Role.DeleteRole(req.params.id, function(err, role) {
            if (err){
                        res.json({uid:req.params.id,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not remove the role!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({uid:req.params.id,message:{type:'success',title:'<strong>Succes!</strong>',msg:'Role was removed!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Create Role
    app.post("/create-role", function(req, res) {
        Role.newRole(null, req.body, function(err, role) {
             if (err){
                        res.json({role:role,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not create the role!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({role:role,message:{type:'success',title:'<strong>Succes!</strong>',msg:'Role is created!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    //Update Role
    app.post("/update-role/:id", function(req, res) {
        Role.newRole(req.params.id, req.body, function(err, role) {
            if (err){
                        res.json({role:role,message:{type:'danger',title:'<strong>Error!</strong>',msg:'Could not update the role!',target:'',url:'',target:'',bar:false}});
                    } 
                    else 
                    {
                        res.json({role:role,message:{type:'success',title:'<strong>Succes!</strong>',msg:'Role is updated!',target:'',url:'',target:'',bar:false}});
                    }
        });
    });
    app.post("/get_roles", function(req, res, next) {
        datatablesQuery.fetchData(req.body, "roles", "role", "rolesTable", true, function(err, data) {
            if (err) {
                res.json(err);
            }
            res.json(data);
        });
    });
    // //Datatable getAllUsers
    app.post("/get_users", function(req, res, next) {
        datatablesQuery.fetchData(req.body, "users", "user", "usersTable", true, function(err, data) {
            if (err) {
                res.json(err);
            }
            res.json(data);
        });
    });
    //Main Settings Page
    app.get("/settings", function(req, res, next) {
        if (req.isAuthenticated()) {
            res.render("admin/settings", {
                title: "Settings!",
                subtitle: "",
                showtitle: "",
                layout: "layouts/sidebar",
                user: req.user
            });
        } else {
            res.redirect("/login");
        }
    });
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
                layout: "layouts/sidebar"
            });
        } else {
            res.redirect("/login");
        }
    });
    //Update user profile
    app.post("/update-profile/:id", function(req, res) {
        User.findUserAndUpdate(req.params.id, req.body, function(err, user) {
             if (err){
                        req.flash('error',{title:'Error!',msg:'Could not update your profile!',target:'',url:'',target:'',bar:false});
                    } 
                    else 
                    {
                        req.flash('success',{title:'Success!',msg:'Profile updated!',target:'',url:'',target:'',bar:false});
                    }
        res.redirect("back");
        });
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
                layout: "layouts/sidebar"
            });
        } else {
            res.redirect("/login");
        }
    });
    //Change language
    app.get("/setlocale/:locale", function(req, res) 
    {
        app.locals.locale = req.params.locale;
        req.flash('info',{title:'Info',msg:'Your language is set to '+req.params.locale,target:'',url:'',target:'',bar:false});
        res.redirect("back");
    });
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
                              req.flash('success',{title:'Welcome!',msg:'Please add the missing data to your profile!',target:'',url:'',target:'',bar:false});
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
    app.get("/acl/lock", function(req, res, next) {
        
        req.flash('warning',{title:'Locked!',msg:'Your session is locked, please enter your pin to proceed!',target:'',url:'',target:'',bar:false});
        res.render("acl/lock", {
            title: "",
            subtitle: "",
            user: req.user,
            showtitle: "none",
            layout: "layouts/default"
        });
    });
};