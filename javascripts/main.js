/* 
* @Project: 	PlexusWiki
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		main.js
* @Path:		C:\PrivateProjects\PlexusWiki\javascripts\main.js
* @Created:   	2016-02-01
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/
  	function cHeight() 
    {
        var a = $(window).height();
        var b = $('#nav-header').innerHeight();
        var c = $('#footer').innerHeight();
        var d = a - b - c - 52;
        $('#main-content').css('min-height', d);
    }  
    function activeNavButton(){
    	var url = window.location.pathname;
  		$('li').removeClass('active');
  		$('a[href="'+url.substr(url.lastIndexOf('/') + 1)+'"]').parent('li').addClass('active');	
    }


    $(window).on('resize', function(){
    	cHeight();
    });

  $(document).ready(function(){
  	cHeight();
	activeNavButton();
  });
