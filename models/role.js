/*
* @Author: JB Stoker
* @Date:   2016-03-07 12:38:35
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-03-14 10:11:43
*/
var mongo = require('mongoose');
var moment = require('moment');
var hash = require('../config/env/acl/middlewares/hash');
var Schema = mongo.Schema;
var RoleSchema = Schema({name: String, 			//Normal name
    					       read: Boolean,
    					       write:Boolean,
    					       edit:Boolean,
    					       delete:Boolean,
    					       publish:Boolean,
    					       user     : [{ type: Number, ref: 'User' }]		
						  	});



function OnOrOff(data){
	if(data === 'on')
	{
		return 1;
	}
	else
	{
		return 0;
	}	

}

RoleSchema.statics.newRole = function(req,name,read,write,edit,del,publish, done)
{
	var Role = this;
	Role.create({name:name,read:OnOrOff(read),write:OnOrOff(write),edit:OnOrOff(edit),delete:OnOrOff(del),publish:OnOrOff(publish)}, function(err, role)
	{
		if(err) throw err;
		done(null, role);
	});
};

RoleSchema.statics.findRoleAndUpdate = function(req,id,name,read,write,edit,del,publish,done)
{
	var Role = this;
	Role.findOneAndUpdate(id,{name:name,read:OnOrOff(read),write:OnOrOff(write),edit:OnOrOff(edit),delete:OnOrOff(del),publish:OnOrOff(publish)},function(err, role){
		if(err) throw err;
		done(null, role, req.flash('success','Your role has been updated!'));	
	});
};

var Role = mongo.model("Role", RoleSchema);
module.exports = Role;