/*
* @Author: JB Stoker
* @Date:   2016-04-16 13:56:53
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-04-21 07:16:48
*/
var uuid = require("uuid"),
db = require("../app").bucket,
moment = require('moment'),
N1qlQuery = require('couchbase').N1qlQuery,
ViewQuery = require('couchbase').ViewQuery;


var env = process.env.NODE_ENV || 'development', config = require('../config/env/config')[env];

function OnOrOff(data)
{
	if(data === 'on')
	{
		return 1;
	}
	else
	{
		return 0;
	}	
}

function RoleModel(){};

RoleModel.newRole = function(uid, data, callback) 
{
	var documentId = uid ? uid : uuid.v4();

    		var roleObject = {uid:documentId,
                              type:'role',
                              name:data.role_name,
							  read:OnOrOff(data.role_read),
							  write:OnOrOff(data.role_write),
							  edit:OnOrOff(data.role_edit),
							  delete:OnOrOff(data.role_del),
							  publish:OnOrOff(data.role_publish)
							  };

			db.upsert(documentId, roleObject, function(error, result) 
			{
			    if(error){
			    		    callback(error, null);
			    		    return;
			    		  }
			    callback(null, {message: "success", data: result});
			});							 
};
//End RoleModel Signup
//RoleModel GetByDocumentId
RoleModel.getByDocumentId = function(documentId, callback) 
{
    var query = ViewQuery.from('dev_roles', 'roles');

    db.query(query, [documentId], function(error, result) 
    {
        if(error)
        {
            return callback(error, null);
        }
        callback(null, result);
    });
};
//End RoleModel GetByDocumentId
//RoleModel DeleteRole
RoleModel.DeleteRole = function(documentId, callback) 
{
    db.remove(documentId, function(error, result) 
    {
        if(error) 
        {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};
//End RoleModel DeleteRole
//RoleModel getAllRoles
RoleModel.getAllRoles = function(callback) 
{
    var query = ViewQuery.from('dev_roles', 'roles');
    
    db.query(query, function(error, result) 
    {
        if(error) 
        {
            return callback(error, null);
        }
        callback(null, result);
    });
};
//End RoleModel getAllRoles

module.exports = RoleModel;