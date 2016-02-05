/* 
* @Project: 	PlexusMain
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		cd-gallery.js
* @Path:		C:\PrivateProjects\PlexusMain\config\theme\js\cd-gallery.js
* @Created:   	2016-02-04
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/			 			 
$(document).ready(function(){  
	           
    $("#mediaUploader").fileinput({
    					allowedFileTypes: ["image","video","audio","text"],
                        previewFileType: ["image","video","audio","text"],
                        browseClass: "btn btn-success",
                        browseLabel: "",
                        browseIcon: "<svg class='icon-photos-1'><use xlink:href='/fonts/icons.svg#icon-photos-1'></use></svg>",
                        removeClass: "btn btn-danger",
                        removeLabel: "",
                        removeIcon: "<svg class='icon-bin-2'><use xlink:href='/fonts/icons.svg#icon-bin-2'></use></svg>",
                        uploadClass: "btn btn-info",
                        uploadLabel: "",
                        uploadIcon: "<svg class='icon-upload-2'><use xlink:href='/fonts/icons.svg#icon-upload-2'></use></svg>"
                    });

	$('ul.mediagallery li img').on('click',function(){
		var src = $(this).attr('src');
		var img = '<img src="' + src + '" class="img-responsive img-polaroid"/>';
		
		//start of new code new code
		var index = $(this).parent('li').index();   
		
		var html = '';
		html += img;                
		html += '<div class="mediaModalControls" style="height:25px;clear:both;display:block;">';
		html += '<a class="controls next col-xs-6 col-sm-6 col-md-6 col-lg-6" href="'+ (index+2) + '"><svg fill="#384b5f" class="pull-right icon-arrow-8"><use xlink:href="/fonts/icons.svg#icon-arrow-8"></use></svg></a>';
		html += '<a class="controls previous col-xs-6 col-sm-6 col-md-6 col-lg-6" href="' + (index) + '"><svg fill="#384b5f" class="pull-left icon-arrow-7"><use xlink:href="/fonts/icons.svg#icon-arrow-7"></use></svg></a>';
		html += '</div>';
		
		$('#mediaModal').modal();
		$('#mediaModal').on('shown.bs.modal', function(){
			$('#mediaModal .modal-body').html(html);
			//new code
			$('a.controls').trigger('click');
		})
		$('#mediaModal').on('hidden.bs.modal', function(){
			$('#mediaModal .modal-body').html('');
		});	
   });	
})
        
         
$(document).on('click', '.mediaModalControls a.controls', function(){
	var index = $(this).attr('href');
	var src = $('ul.row li:nth-child('+ index +') img').attr('src');             
	
	$('.modal-body img').attr('src', src);
	$('.modal-title').html(src.replace(/^.*\/|\.[^.]*$/g, ''));
	
	var newPrevIndex = parseInt(index) - 1; 
	var newNextIndex = parseInt(newPrevIndex) + 2; 
	
	if($(this).hasClass('previous'))
	{               
		$(this).attr('href', newPrevIndex); 
		$('a.next').attr('href', newNextIndex);
	}
	else
	{
		$(this).attr('href', newNextIndex); 
		$('a.previous').attr('href', newPrevIndex);
	}
	
	var total = $('ul.row li').length + 1; 
	//hide next button
	if(total === newNextIndex)
	{
		$('a.next').hide();
	}
	else
	{
		$('a.next').show();
	}            
	//hide previous button
	if(newPrevIndex === 0)
	{
		$('a.previous').hide();
	}
	else
	{
		$('a.previous').show();
	}
	return false;
});