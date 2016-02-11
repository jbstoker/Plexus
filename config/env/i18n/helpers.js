/* 
* @Project: 	PlexusMain
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		helpers.js
* @Path:		C:\PrivateProjects\PlexusMain\config\env\i18n\helpers.js
* @Created:   	2016-02-10
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/
module.exports = function(hbs,app){

	//Helper Languages list, defined in config file
	hbs.registerHelper('langList', function(){
	  var code = this.replace("'","");
	  
	  if(app.locals.locale == code)
	  {
	  var element = '<li class="col-xs-6 col-sm-6 col-md-4 col-lg-4 active"><a href="/setlocale/'+code+'" id="flag_'+code+'">'+code+'</a></li>';
	  }
	  else
	  {
	  var element = '<li class="col-xs-6 col-sm-6 col-md-4 col-lg-4"><a href="/setlocale/'+code+'" id="flag_'+code+'">'+code+'</a></li>';
	  }	

	  return new hbs.SafeString(element);
	});


}