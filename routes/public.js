var express = require("express"),
passport = require("passport"),
moment = require("moment"),
LocalStrategy = require("passport-local").Strategy,
Auth = require("../config/env/acl/middlewares/authorization.js"),
datatablesQuery = require("../middlewares/datatables/query"),
User = require("../models/user"),
Role = require("../models/role");

module.exports = function(app, passport, i18n) {
/* To disable title in page set "showtitle" to none // extends display:
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
};