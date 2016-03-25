/*
* @Author: JB Stoker
* @Date:   2016-03-07 12:38:35
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-03-25 15:08:12
*/
var moment = require('moment');
var db = require('../config/env/db.js');
var ottoman = require('ottoman');

var RoleModel = ottoman.model("Role",{roleID: {type:'string', auto:'uuid', readonly:true},
									name: "string", 			//Normal name
    					       		read: {type:"boolean",default: true},
    					       		write:{type:"boolean",default: false},
    					       		edit:{type:"boolean",default: false},
    					       		delete:{type:"boolean",default: false},
    					       		publish:{type:"boolean",default: false}		
						  			},{
    							 		index: {	
    							 		    	findByID:{ by:"roleID"},
    							 		    	findByName: {by: "name"}
    											}
							  	      });



// function OnOrOff(data){
// 	if(data === 'on')
// 	{
// 		return 1;
// 	}
// 	else
// 	{
// 		return 0;
// 	}	

// }

// RoleModel.newRole = function(req,name,read,write,edit,del,publish, done)
// {
// 	var Role = this;
// 	Role.create({name:name,read:OnOrOff(read),write:OnOrOff(write),edit:OnOrOff(edit),delete:OnOrOff(del),publish:OnOrOff(publish)}, function(err, role)
// 	{
// 		if(err) throw err;
// 		done(null, role);
// 	});
// };

// RoleModel.findRoleAndUpdate = function(req,id,name,read,write,edit,del,publish,done)
// {
// 	var Role = this;
// 	Role.findOneAndUpdate(id,{name:name,read:OnOrOff(read),write:OnOrOff(write),edit:OnOrOff(edit),delete:OnOrOff(del),publish:OnOrOff(publish)},function(err, role){
// 		if(err) throw err;
// 		done(null, role, req.flash('success','Your role has been updated!'));	
// 	});
// };

module.exports = RoleModel;