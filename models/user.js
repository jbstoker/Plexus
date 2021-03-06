/* 
* @Project: 	PlexusMain
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		user.js
* @Path:		C:\PrivateProjects\PlexusMain\models\user.js
* @Created:   	2015-12-05
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/			 			 
'use strict';
var mongo = require('mongoose');
var hash = require('../config/env/acl/middlewares/hash');

var UserSchema = mongo.Schema({	surname: String,
    					    	middlename: String,
    					    	lastname: String,
    					    	email: String,
    					    	phone: String,
    					    	mobile: String,
    					    	birtdate: Date,
    					    	salt:       String,
						    	hash:       String,
    					    	apikey: String,
    					    	apisecret: String,
						    	facebook:{
						    		id:       String,
						    		email:    String,
						    		name:     String
						    	},
						    	google:{
						    		id:       String,
						    		email:    String,
						    		name:     String
						    	}
						  	});

UserSchema.statics.signup = function(email, password, done){
	var User = this;
	hash(password, function(err, salt, hash){
		if(err) throw err;
		// if (err) return done(err);
		User.create({
			email : email,
			salt : salt,
			hash : hash
		}, function(err, user){
			if(err) throw err;
			// if (err) return done(err);
			done(null, user);
		});
	});
}

UserSchema.statics.isValidUserPassword = function(email, password, done) {
	this.findOne({email : email}, function(err, user){
		// if(err) throw err;
		if(err) return done(err);
		if(!user) return done(null, false, { message : 'Incorrect email.' });
		hash(password, user.salt, function(err, hash){
			if(err) return done(err);
			if(hash == user.hash) return done(null, user);
			done(null, false, {
				message : 'Incorrect password'
			});
		});
	});
};

// Create a new user given a profile
UserSchema.statics.findOrCreateOAuthUser = function(profile, done){
	var User = this;

	// Build dynamic key query
	var query = {};
	query[profile.authOrigin + '.id'] = profile.id;

	// Search for a profile from the given auth origin
	User.findOne(query, function(err, user){
		if(err) throw err;

		// If a user is returned, load the given user
		if(user){
			done(null, user);
		} else {
			// Otherwise, store user, or update information for same e-mail
			User.findOne({ 'email' : profile.emails[0].value }, function(err, user){
				if(err) throw err;

				if(user){
					// Preexistent e-mail, update
					user[''+profile.authOrigin] = {};
					user[''+profile.authOrigin].id = profile.id;
					user[''+profile.authOrigin].email = profile.emails[0].value;
					user[''+profile.authOrigin].name = profile.displayName;

					user.save(function(err, user){
						if(err) throw err;
						done(null, user);
					});
				} else {
					// New e-mail, create
					
					// Fixed fields
					user = {
						email : profile.emails[0].value,
						firstName : profile.displayName.split(" ")[0],
						lastName : profile.displayName.replace(profile.displayName.split(" ")[0] + " ", "")
					};

					// Dynamic fields
					user[''+profile.authOrigin] = {};
					user[''+profile.authOrigin].id = profile.id;
					user[''+profile.authOrigin].email = profile.emails[0].value;
					user[''+profile.authOrigin].name = profile.displayName;

					User.create(
						user,
						function(err, user){
							if(err) throw err;
							done(null, user);
						}
					);
				}
			});
		}
	});
}

var User = mongo.model("User", UserSchema);
module.exports = User;










