/*
* @Author: JB Stoker
* @Date:   2016-04-16 13:56:53
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-04-20 19:53:53
*/
var uuid = require("uuid"),
db = require("../app").bucket,
N1qlQuery = require('couchbase').N1qlQuery,
gm = require('gm'),
hash = require('../config/env/acl/middlewares/hash'),
moment = require('moment');
var env = process.env.NODE_ENV || 'development', config = require('../config/env/config')[env];

function UserModel(){};

UserModel.createOrUpdate = function(uid,data, callback) 
{
	var documentId = uid ? uid : uuid.v4();
	hash(data.password, function(err, salt, hash)
	{
		if(err) throw err;
		{
    		var userObject = {  type: 'user',
								uid: documentId,
								name: data.fullname, 				
    					    	email: data.email, 			
    					    	phone: '', 			
    					    	address:{ 							
    					    				street:'',
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
						    	     	status: '',
						    	     	code: Math.random().toString(36).substring(7),
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
						    	role :''};

			db.upsert(documentId, userObject, function(error, result) 
			{
			    if(error){
    			    		return  callback(error, null);

			    		  }
			    return callback(null, {message: "success", data: result});
			});					 
		}
	});
};
//End UserModel Signup
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
            return callback(null, result);
    });
};
//Find user by email
//UserModel GetByDocumentId
UserModel.getByDocumentId = function(documentId, callback) 
{
    var statement = "SELECT * " +
                    "FROM `" + config.db.bucket + "` AS users " +
                    "WHERE META(users).id = $1";

    var query = N1qlQuery.fromString(statement);
    db.query(query, [documentId], function(error, result) 
    {
        if(error)
        {
            return callback(error, null);
        }
        return callback(null, result);
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
//UserModel getAllUsers
UserModel.getAllUsers = function(callback) 
{
    var statement = "SELECT META(users).id, *" +
                    "FROM `" + config.db.bucket + "` AS users";
    var query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    
    db.query(query, function(error, result) 
    {
        if(error) 
        {
            return callback(error, null);
        }
        callback(null, result);
    });
};
//End UserModel getAllUsers
UserModel.isValidUserPassword = function(req, email, password, callback)
{
 var statement = "SELECT * FROM `" + config.db.bucket + "` AS users WHERE login = $1";
 var query = N1qlQuery.fromString(statement);

    db.query(query, [email], function(error, result) 
    {
        if(error){ return callback(error, null); }
			
			if(result.length != 0) 
		 	{
				hash(password, result[0].users.salt, function(err, hash)
				{
					if(err){ return callback(err); }
					if(hash == result.hash){ return callback(null, result); }
					 
        			return callback(null, result);
				});
        	}
        	else
        	{
        	  	return callback(null, result[0]);
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

        userDocument.name = profile.name;
        userDocument.email = profile.email;
        userDocument.phone = profile.phone;
        userDocument.address.street = profile.address;
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
//End UserModel.findUserAndUpdate
UserModel.findAvatarAndUpdate = function(file,params,userId,newfilename, callback) 
{
	gm(file.buffer,newfilename).crop(params.width, params.height, params.x, params.y).resize(200,200).write('public/uploads/avatar/'+newfilename, function (err){
	  if (err){
	  			throw err;
	  		  }
	  		  else
	  		  {
			    db.get(userId, function(error, result) {
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
	if(params.status === undefined){ params.status = '0'};
	if(params.role === undefined){ params.role = ''};

			    db.get(userId, function(error, result) 
			    {
			        if(error) 
			        {
			            return callback(error, null);
			        }

			        var userDocument = result.value;
			        userDocument.name = params.name;
			        userDocument.email = params.email;
			        userDocument.acl.status = params.status;
			        userDocument.role = params.role;

			        db.replace(userId, userDocument, function(error, result) 
			        {
			            if(error) 
			            {
			                return callback(error, null);
			            }
			            return callback(null, userDocument);
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
            var userDocument = {
                "type": "user",
                "uid": uuid.v4(),
                "name": params.user_name,
                "email": params.user_email,
                "acl": {
                			"status":params.user_accepted
                		},
                "role": params.user_role};

            db.insert(userDocument.uid, userDocument, function(error, result) 
            {
                if(error){
                    		return callback(error);
                		 }
                return callback(null, userDocument);
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