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
var gm = require('gm');
var mongo = require('mongoose');
var moment = require('moment');
var hash = require('../config/env/acl/middlewares/hash');
var Schema = mongo.Schema;

var UserSchema = Schema({	name: String, 			//Normal name
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
						    	pin:        String,
						    	acl:{//Acces and Controll Data
						    	     "status":String,
						    	     "role":String,
						    	     },  	
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
						    	},
						    	role : [{ type: Schema.Types.ObjectId, ref: 'Role' }]//Population Role records for acl
						  	});


UserSchema.statics.signup = function(req,fullname,email, password, done)
{
		var User = this;
		hash(password, function(err, salt, hash)
		{
			if(err) throw err;
			User.create({
				name : fullname,
				email : email,
				login : email,
				acl:{ 
						status: "unvalidated",
						code: Math.random().toString(36).substring(7)
					},
				salt : salt,
				hash : hash
			}, function(err, user)
			{
				if(err) throw err;
				done(null, user);
			});
		});
}

UserSchema.statics.isValidUserPassword = function(req, email, password, done){
	this.findOne({email : email}, function(err, user){
		// if(err) throw err;
		if(err) return done(err);

		if(!user) return done(null, false, req.flash('error','Incorrect Login.'));
		
		hash(password, user.salt, function(err, hash)
		{
			if(err) return done(err);
			if(hash == user.hash) return done(null, user);
			
			done(null, false, req.flash('error','Incorrect password'));
		});
	});
};

UserSchema.statics.findUserAndUpdate = function(req,id,name,personal_quote,personal_info,birthday,address,postalcode,city,country,email,phone,website,done)
{
	var User = this;
	User.findOneAndUpdate(id,{name: name, email: email, phone: phone, address:{ street:address, postalcode:postalcode, city:city, country:country }, website: website, birthday: birthday, info:{ personal_text:personal_info, quote:personal_quote }},function(err, user){
		if(err) throw err;
		done(null, user, req.flash('success','Your profile has been updated!'));	
	});
};

UserSchema.statics.findACLUserAndUpdate = function(req,id,name,email,role,status,done)
{
	var User = this;
	User.findOneAndUpdate(id,{name: name, email: email, acl:{ status:status}},function(err, user){
		if(err) throw err;
		done(null, user, req.flash('success','The user has been updated!'));	
	});
};

UserSchema.statics.findAvatarAndUpdate = function(file,extra,id,newfilename){	
	var User = this;

	gm(file.buffer,newfilename).crop(extra.width, extra.height, extra.x, extra.y).resize(200,200).write('public/uploads/avatar/'+newfilename, function (err){
	  if (err){
	  			console.log(['err'], [err]);
	  		  }
	  		  else
	  		  {
					User.findOneAndUpdate(id,{avatar:newfilename},function(err, user){ if(err) throw err; });		
	  		  } 
	});
};

var User = mongo.model("User", UserSchema);
module.exports = User;










