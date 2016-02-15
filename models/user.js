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
var mongo = require('mongoose');
var hash = require('../config/env/acl/middlewares/hash');

var UserSchema = mongo.Schema({	name: String, 			//Normal name
    					    	email: String, 			//Contact email
    					    	phone: String, 			//phonnumber
    					    	address:{ 				//Address
    					    		street:String,
    					    		postalcode:String,
    					    		city:String,
    					    		country:String,
    					    	},
    					    	website: String,		//Website
    					    	birthday: Date,			//Date of birth
    					    	avatar: String,			//Avatar link
    					    	info:{					//peronal info and quote
    					    		personal_text:String,
    					    		quote:String,
    					    	},
    					    	locale: 	String, 	//User prefered language
    					    	role: 		String,		//User acces role
    					    	login: 		String,		//Login Name
    					    	salt:   	String,		//Salt Pass
						    	hash:   	String,		//Hashed Pass
						    	pin:        String,  	//Hashed Pincode
    					    	apikey: 	String,		//Apikey if needed
    					    	apisecret: 	String,		//ApiSecret
						    	facebook:{				//Facebook login
						    		id:       String,
						    		email:    String,
						    		name:     String
						    	},
						    	google:{				//Google login
						    		id:       String,
						    		email:    String,
						    		name:     String
						    	}
						  	});

UserSchema.statics.signup = function(email, password, done){
	var User = this;
	hash(password, function(err, salt, hash){
		if(err) throw err;
		User.create({
			email : email,
			login : email,
			salt : salt,
			hash : hash
		}, function(err, user)
		{
			if(err) throw err;
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

UserSchema.statics.findUserAndUpdate = function(id,name,personal_quote,personal_info,birthday,address,postalcode,city,country,email,phone,website,done)
{
	var User = this;
	User.findOneAndUpdate(id,{name: name, email: email, phone: phone, address:{ street:address, postalcode:postalcode, city:city, country:country }, website: website, birthday: birthday, info:{ personal_text:personal_info, quote:personal_quote }},function(err, user){
		if(err) throw err;
		done(null, user);	
	});
};

var User = mongo.model("User", UserSchema);
module.exports = User;










