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
// var Role = require('./role.js');
var hash = require('../config/env/acl/middlewares/hash');
var moment = require('moment');
var db = require('../config/env/db.js');
var ottoman = require('ottoman');

var UserModel = ottoman.model('User',{	
								userID: {type:'string', auto:'uuid', readonly:true},
								name: 	'string', 				//Normal name
    					    	email: 	'string', 			//Contact email
    					    	phone: 	'string', 			//phonnumber
    					    	address:{ 							//Address
    					    		street:'string',
    					    		postalcode:'string',
    					    		city:'string',
    					    		country:'string',
    					    	},
    					    	website: 	'string',			//Website
    					    	birthday: 	{type: 'Date', default:function(){ return new Date() }},//Date of birth
    					    	avatar: 	'string',			//Avatar link
    					    	info:{								//peronal info and quote
    					    		personal_text: 	'string',
    					    		quote: 			'string',
    					    	},
    					    	locale: 	{type:'string', default: 'nl'},//User prefered language
    					    	login: 		'string',		//Login Name
    					    	salt:   	'string',		//Salt Pass
						    	hash:   	'string',		//Hashed Pass
						    	pin:        'string',
						    	acl:{								//Acces and Controll Data
						    	     status: 	{type:'boolean', default: false},
						    	     code: 		{type:'string', default:function(){return Math.random().toString(36).substring(7) }},
						    	     },  	
    					    	apikey: 	'string',		//Apikey if needed
    					    	apisecret: 	'string',		//ApiSecret
						    	facebook:{							//Facebook login
						    		socialID:     'string',
						    		email:    'string',
						    		name:     'string'
						    	},
						    	google:{							//Google login
						    		socialID:     'string',
						    		email:    'string',
						    		name:     'string'
						    	},
    					    	createdOn: {type: 'Date', default:function(){ return new Date() }},//Date of birth
						    	role : 		{ref:'Role'}
						    	},{
    							 index: {
    							 		findByID:{by: 'userID' },
    							     	findByEmail: {by: 'email'},
    							     	findByName: {by: 'name'}}
							  	});

console.log(UserModel);
// UserModel.signup = function(req,fullname,email, password, done)
// {
// console.log('signingup');
// 		var User = this;

// 		console.log(User);
// 		hash(password, function(err, salt, hash)
// 		{
// 			if(err) throw err;
// 			User.create({
// 				name : fullname,
// 				email : email,
// 				login : email,
// 				salt : salt,
// 				hash : hash
// 			}, function(err, user)
// 			{
// 				if(err) throw err;
// 				done(null, user);
// 			});
// 		});
// }




// UserModel.isValidUserPassword = function(req, email, password, done){
// 	this.findOne({login : email}, function(err, user){
// 		// if(err) throw err;
// 		if(err) return done(err);

// 		if(!user) return done(null, false, req.flash('error','Incorrect Login.'));
		
// 		hash(password, user.salt, function(err, hash)
// 		{
// 			if(err) return done(err);
// 			if(hash == user.hash) return done(null, user);
			
// 			done(null, false, req.flash('error','Incorrect password'));
// 		});
// 	});
// };

// UserModel.findUserAndUpdate = function(req,id,name,personal_quote,personal_info,birthday,address,postalcode,city,country,email,phone,website,done)
// {
// 	var User = this;
// 	User.findOneAndUpdate(id,{name: name, email: email, phone: phone, address:{ street:address, postalcode:postalcode, city:city, country:country }, website: website, birthday: birthday, info:{ personal_text:personal_info, quote:personal_quote }},function(err, user){
// 		if(err) throw err;
// 		done(null, user, req.flash('success','Your profile has been updated!'));	
// 	});
// };

// UserModel.findACLUserAndUpdate = function(req,id,name,email,role,status,done)
// {
// 	var User = this;

// 	if(status === undefined){ status = '0'};
// 	if(role === undefined){ role = ''};

// 	User.findOneAndUpdate(id,{name: name, email: email, acl:{ status:status},role:role},function(err, user){
// 		if(err) throw err;
// 		done(null, user, req.flash('success','The user has been updated!'));	
// 	});
// };

// UserModel.createACLUser = function(req,name,email,role,status,done)
// {
// 	var User = this;
// 	if(status === undefined){ status = '0'};
// 	if(role === undefined){ role = ''};

// 	User.create({name: name, email: email, acl:{ status:status},role:role},function(err, user){
// 		if(err) throw err;
// 		done(null, user, req.flash('success','The user has been created!'));	
// 	});
// };

// UserModel.findAvatarAndUpdate = function(file,extra,id,newfilename){	
// 	var User = this;

// 	gm(file.buffer,newfilename).crop(extra.width, extra.height, extra.x, extra.y).resize(200,200).write('public/uploads/avatar/'+newfilename, function (err){
// 	  if (err){
// 	  			throw err;
// 	  		  }
// 	  		  else
// 	  		  {
// 					User.findOneAndUpdate(id,{avatar:newfilename},function(err, user){ if(err) throw err; });		
// 	  		  } 
// 	});
// };

module.exports = UserModel;










