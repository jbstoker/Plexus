/*
* @Author: JB Stoker
* @Date:   2016-04-16 13:56:53
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-05-25 13:55:58
*/
var uuid = require("uuid"),
db = require("../app").bucket,
N1qlQuery = require('couchbase').N1qlQuery,
gm = require('gm'),
hash = require('../config/env/acl/middlewares/hash'),
mailer = require('../middlewares/mailer/mailer'),
moment = require('moment'),
sanitizeHtml = require('sanitize-html'),
env = process.env.NODE_ENV || 'development', 
config = require('../config/env/config')[env];

function UserModel(){};

UserModel.createOrUpdate = function(uid,data, callback) 
{
	var documentId = uid ? uid : uuid.v4();
	hash(data.password, function(err, salt, hash)
	{
		if(err) throw err;
		{
            var code = Math.random().toString(36).substring(7);
    		var userObject = {  type: 'user',
								uid: documentId,
                                gender: '',                
                                title: '',                
                                surname: data.fullname,                
                                middlename: '',                
                                lastname: '',                
								maidenname: '', 				
    					    	email: '', 			
                                phone: '',          
    					    	mobile: '', 			
    					    	address:{ 							
                                            street:'',
    					    				number:'',
    					    				postalcode:'',
    					    				city:'',
    					    				country:'',
    					    			},
    					    	website: '',			
    					    	birthday: new Date(),
    					    	avatar: '',			
    					    	info:{								
    					    			personal_text: '',
    					    			quote: '',
    					    		 },
    					    	locale: 'nl',
    					    	login: data.email,		
    					    	salt: salt,		
						    	hash: hash,		
						    	pin:  '',
						    	acl:{								
						    	     	status: '0',
						    	     	code: code,
						    	     },  	
    					    	apikey: '',		
    					    	apisecret: '',		
						    	facebook:{							
						    				socialID: '',
						    				email: '',
						    				name: ''
						    			},
						    	google:{							
						    				socialID: '',
						    				email: '',
						    				name: ''
						    			},
    					    	createdOn: new Date(),
						    	role :{
                                        uid:'',
                                        text:''

                                }};

			db.upsert(documentId, userObject, function(error, result) 
			{
			    if(error){
    			    		return  callback(error, null);

			    		  }
                    var subject = 'Welcome!';         
                    var body = '<p>You just created an new account at '+ config.app.name +'.</p>'+
                               '<a href="http://localhost:3000/activate?code='+code+'">Please Activate your account by visiting this link.</a>';

                    mailer.sendmail(data.email, subject, body,'html');        
          

			    return callback(null, {message: "success", data: userObject});
            });                  
		}
	});
};
//End UserModel Signup
//End UserModel.sendmail
UserModel.SendMail = function(userId,params, callback) 
{
                db.get(userId, function(error, result) 
                {
                    if(error) 
                    {
                        return callback(error, null);
                    }
                    var to = result.value.email;
                    var subject = sanitizeHtml(params.subject);         
                    var body = sanitizeHtml(decodeURIComponent(params.body));
                    
                    mailer.sendmail(to, subject, body, 'html');        

                return callback(null, {message: "success", data: result});
                });     
};
UserModel.ContactMail = function(params, callback) 
{                               
                    var to = config.modules.contact.contact_address;
                    var subject = 'From: '+params.name+' :: '+params.email;         
                    var body = sanitizeHtml(decodeURIComponent(params.body));
                    
                    mailer.sendmail(to, subject, body, 'text');
                    return callback(null);
};
//Find user by email
UserModel.findByEmail = function(email, callback) 
{
    var statement = "SELECT * " +
                    "FROM `" + config.db.bucket + "` AS users " +
                    "WHERE META(users).email = $1";
    var query = N1qlQuery.fromString(statement);

    db.query(query, [email], function(error, result) 
    {
        if(error)
        {
            return callback(error, null);
        }
        else
        {
            return callback(null, result);
        }    
    });
};
//Find user by email
//UserModel GetByDocumentId
UserModel.getByDocumentId = function(documentId, callback) 
{
    db.get(documentId,{stale:1}, function(error, result) 
    {
        if(error)
        {
            return callback(error, null);
        }
        return callback(null, result.value);
    });
};
//End UserModel GetByDocumentId
//UserModel DeleteUser
UserModel.DeleteUser = function(documentId, callback) 
{
    db.remove(documentId, function(error, result) 
    {
        if(error) 
        {
            return callback(error, null);
        }
       return callback(null, {message: "success", data: result});
    });
};
//End UserModel DeleteUser
//End UserModel getAllUsers
UserModel.isValidUserPassword = function(email, password, done)
{
 var statement = "SELECT * FROM `" + config.db.bucket + "` AS users WHERE login = $1";
 var query = N1qlQuery.fromString(statement);

    db.query(query, [email], function(error, result) 
    {
        if(error)
        { 
            return done(null, false,error);
        }
        else
        {
            if(result.length > 0) 
            {
                hash(password, result[0].users.salt, function(err, hash)
                {   
                    if(err)
                    {
                        return done(err); 
                    }
                    else
                    {
                        var dbHash = new Buffer(result[0].users.hash.data);
                        if(hash.toString() == dbHash.toString())
                        { 
                            return done(null, result, 'Welcome!');
                        }
                        else
                        {
                            return done(null, false, 'Your password is not correct!');
                        }
                    }    
                });
            }
            else
            {
                return done(null, false,'Your login does not exists within our system');
        	}	
        }    
            
    });    
};
//End UserModel.isValidUserPassword
UserModel.findUserAndUpdate = function(userId, profile, callback) 
{
    db.get(userId, function(error, result) 
    {
        if(error) {
            return callback(error, null);
        }
        var userDocument = result.value;
        userDocument.gender = profile.gender;
        userDocument.title = profile.title;
        userDocument.surname = profile.surname;
        userDocument.middlename = profile.middlename;
        userDocument.lastname = profile.lastname;
        userDocument.maidenname = profile.maidenname;
        userDocument.email = profile.email;
        userDocument.phone = profile.phone;
        userDocument.mobile = profile.mobile;
        userDocument.address.street = profile.address;
        userDocument.address.number = profile.number;
        userDocument.address.postalcode = profile.postalcode;
        userDocument.address.city = profile.city;
        userDocument.address.country = profile.country;
        userDocument.website = profile.website;
        userDocument.birthday = profile.birthday;
        userDocument.info.personal_text = profile.personal_info;
        userDocument.info.quote = profile.personal_quote;


        db.replace(userId, userDocument, function(error, result) {
            if(error) {
                return callback(error, null);
            }
            return callback(null, userDocument);
        });
    });
};
UserModel.setLocale = function(userId, locale, callback) 
{
    db.get(userId, function(error, result) 
    {
        if(error) {
            return callback(error, null);
        }

        var userDocument = result.value;
        userDocument.locale = locale;


        db.replace(userId, userDocument, function(error, result) {
            if(error) {
                return callback(error, null);
            }
            return callback(null, userDocument);
        });
    });
};
//End UserModel.findUserAndUpdate
UserModel.findAvatarAndUpdate = function(file,params,userId,newfilename, callback) 
{
	gm(file.buffer,newfilename).crop(params.width, params.height, params.x, params.y).resize(200,200).write('public/uploads/avatar/'+newfilename, function (err){
	  if (err){
	  			throw err;
	  		  }
	  		  else
	  		  {
			    db.get(userId,{stale:1}, function(error, result) {
			        if(error) 
			        {
			            return callback(error, null);
			        }
			        
			        var userDocument = result.value;
			        userDocument.avatar = newfilename;
			        db.replace(userId, userDocument, function(error, result) 
			        {
			            if(error) 
			            {
			                return callback(error, null);
			            }
			            return callback(null, userDocument);
			        });
			    });
	  		  } 
	});
};
//End UserModel.findAvatarAndUpdate
UserModel.findACLUserAndUpdate = function(userId,params, callback) 
{
	if(params.user_accepted === undefined){ params.user_accepted = '0'};
	if(params.user_role === undefined){ params.user_role = ''};

			    db.get(userId, function(error, result) 
			    {
			        if(error) 
			        {
			            return callback(error, null);
			        }

			        var userDocument = result.value;
                    userDocument.title = params.user_title;
                    userDocument.surname = params.user_surname;
                    userDocument.middlename = params.user_middlename;
                    userDocument.lastname = params.user_lastname;
			        userDocument.maidenname = params.user_maidenname;
			        userDocument.email = params.user_email;
			        userDocument.acl.status = params.user_accepted;

                    db.get(params.user_role, function(error, result) 
                    {
                        if(error) 
                        {
                            return callback(error, null);
                        }

                    userDocument.role.uid = result.value.uid;
			        userDocument.role.text = result.value.name;

    			        db.replace(userId, userDocument, function(error, result) 
    			        {
    			            if(error) 
    			            {
    			                return callback(error, null);
    			            }
    			            return callback(null, userDocument);
    			        });
                    });   

			    });    	
};
//End UserModel.findACLUserAndUpdate
UserModel.createACLUser = function(params, callback) 
{
 var statement = "SELECT * FROM `" + config.db.bucket + "` AS users WHERE login = $1";
 var query = N1qlQuery.fromString(statement);

    db.query(query, [params.user_email], function(error, result) 
    {
        if(error){ return callback(error, null); }
        if(params.user_accepted === undefined){ params.user_accepted = '0'};
		if(params.user_role === undefined){ params.user_role = ''};	

		 if(result.length <= 0) 
		 {
            db.get(params.user_role, function(error, result) 
                    {
                        if(error) 
                        {
                            return callback(error, null);
                        }

                        var code = Math.random().toString(36).substring(7);
                        var userDocument = {
                            "type": "user",
                            "uid": uuid.v4(),
                            "title": params.user_title,
                            "surname": params.user_surname,
                            "middlename": params.user_middlename,
                            "lastname": params.user_lastname,
                            "maidenname": params.user_maidenname,
                            "email": params.user_email,
                            "acl": {
                                        "status":params.user_accepted,
                                        "code":code,
                                    },
                            "role": {
                                        "uid":params.user_role,
                                        "text":result.value.name
                                    }};

                        db.insert(userDocument.uid, userDocument, function(error, result) 
                        {
                            if(error){
                                        return callback(error);
                                     }

                            var subject = 'Er is een account voor u geregistreerd!';         
                            var body = '<p>There has been an new account created for you at '+ config.app.name +'.</p>'+
                                       '<a href="http://localhost:3000/activate?code='+code+'">Please Activate by visiting this link.</a>';

                            mailer.sendmail(params.user_email, subject, body,'html');        

                            return callback(null, userDocument);
                        });
                    });   
        } 
        else 
        {
            return callback(null, result[0]);
        }
    }); 
};
//End UserModel.createACLUser
module.exports = UserModel;