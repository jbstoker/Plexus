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
var moment = require('moment');
var hash = require('../config/env/acl/middlewares/hash');
var ottoman = require('ottoman');

var UserModel = ottman.model('User',{	
								uuid: {type:'string', auto:'uuid', readonly:true},
								name: {type:'string'}, 				//Normal name
    					    	email: {type:'string'}, 			//Contact email
    					    	phone: {type:'string'}, 			//phonnumber
    					    	address:{ 							//Address
    					    		street:{type:'string'},
    					    		postalcode:{type:'string'},
    					    		city:{type:'string'},
    					    		country:{type:'string'},
    					    	},
    					    	website: {type:'string'},			//Website
    					    	birthday: {type: "Date", default: Date.now},//Date of birth
    					    	avatar: {type:'string'},			//Avatar link
    					    	info:{								//peronal info and quote
    					    		personal_text:{type:'string'},
    					    		quote:{type:'string'},
    					    	},
    					    	locale: 	{type:'string'}, 		//User prefered language
    					    	login: 		{type:'string'},		//Login Name
    					    	salt:   	{type:'string'},		//Salt Pass
						    	hash:   	{type:'string'},		//Hashed Pass
						    	pin:        {type:'string'},
						    	acl:{								//Acces and Controll Data
						    	     status: {type:'string'},
						    	     code: {type:'string'},
						    	     },  	
    					    	apikey: 	{type:'string'},		//Apikey if needed
    					    	apisecret: 	{type:'string'},		//ApiSecret
						    	facebook:{							//Facebook login
						    		id:       {type:'string'},
						    		email:    {type:'string'},
						    		name:     {type:'string'}
						    	},
						    	google:{							//Google login
						    		id:       {type:'string'},
						    		email:    {type:'string'},
						    		name:     {type:'string'}
						    	},
    					    	created_at: {type: "Date", default: Date.now},//Date of birth
						    	role : {ref:'Role'},
						    	{
    							 index: {	
    							     findByID:{				// ← refdoc index
    							         by:'uuid',
    							         type:'refdoc'
    							     },
    							     findByEmail: {					// ← refdoc index
    							         by: 'email',
    							         type: 'refdoc'
    							     },
    							     findByFirstName: {				// ← secondary index
    							         by: 'name.first'
    							    }
    							}				//Population Role records for acl
						  	});


UserModel.statics.signup = function(req,fullname,email, password, done)
{
		var User = this;
		hash(password, function(err, salt, hash)
		{
			var code = Math.random().toString(36).substring(7);

			if(err) throw err;
			User.create({
				name : fullname,
				email : email,
				login : email,
				acl:{ status: '0', code: code},
				salt : salt,
				hash : hash
			}, function(err, user)
			{
				if(err) throw err;
				done(null, user);
			});
		});
}




UserModel.statics.isValidUserPassword = function(req, email, password, done){
	this.findOne({login : email}, function(err, user){
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

UserModel.statics.findUserAndUpdate = function(req,id,name,personal_quote,personal_info,birthday,address,postalcode,city,country,email,phone,website,done)
{
	var User = this;
	User.findOneAndUpdate(id,{name: name, email: email, phone: phone, address:{ street:address, postalcode:postalcode, city:city, country:country }, website: website, birthday: birthday, info:{ personal_text:personal_info, quote:personal_quote }},function(err, user){
		if(err) throw err;
		done(null, user, req.flash('success','Your profile has been updated!'));	
	});
};

UserModel.statics.findACLUserAndUpdate = function(req,id,name,email,role,status,done)
{
	var User = this;

	if(status === undefined){ status = '0'};
	if(role === undefined){ role = ''};

	User.findOneAndUpdate(id,{name: name, email: email, acl:{ status:status},role:role},function(err, user){
		if(err) throw err;
		done(null, user, req.flash('success','The user has been updated!'));	
	});
};

UserModel.statics.createACLUser = function(req,name,email,role,status,done)
{
	var User = this;
	if(status === undefined){ status = '0'};
	if(role === undefined){ role = ''};

	User.create({name: name, email: email, acl:{ status:status},role:role},function(err, user){
		if(err) throw err;
		done(null, user, req.flash('success','The user has been created!'));	
	});
};

UserModel.statics.findAvatarAndUpdate = function(file,extra,id,newfilename){	
	var User = this;

	gm(file.buffer,newfilename).crop(extra.width, extra.height, extra.x, extra.y).resize(200,200).write('public/uploads/avatar/'+newfilename, function (err){
	  if (err){
	  			throw err;
	  		  }
	  		  else
	  		  {
					User.findOneAndUpdate(id,{avatar:newfilename},function(err, user){ if(err) throw err; });		
	  		  } 
	});
};

module.exports = UserModel;










