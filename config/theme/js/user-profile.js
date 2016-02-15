/* 
* @Project: 	PlexusMain
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		user-profile.js
* @Path:		C:\PrivateProjects\PlexusMain\config\theme\js\user-profile.js
* @Created:   	2016-02-08
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/			 			 
		
jQuery(document).ready(function($) {
//Edit Profile toggle
$('#editProfile').change(function(){
	
        //Check if swicth is selected  
        if($(this).prop('checked'))
        {
          //Fetch existig data
           var quote =  $('#profile-quote blockquote').html();
           var info =  $('#profile-info p').html();
           var name =  $('ul.details li#name').children(":not('span')").html();
           var birthday =  $('ul.details li#birthday').children(":not('span')").html();
           var address =  $('ul.details li#address').children(":not('span')").html();
           var postalcode =  $('ul.details li#postalcode').children(":not('span')").html();
           var city =  $('ul.details li#city').children(":not('span')").html();
           var country =  $('ul.details li#country').children(":not('span')").html();
           var email =  $('ul.details li#email').children(":not('span')").html();
           var phone =  $('ul.details li#phone').children(":not('span')").html();
           var website =  $('ul.details li#website').children(":not('span')").html();
           //Generate input fields for update profile
          $('#saveChanges').show();
          $('#profile-quote').html('<textarea data-old="'+quote+'" id="personal_quote" name="personal_quote" class="form-control col-md-12" rows="3">'+quote+'</textarea>');
          $('#profile-info').html('<h3>Personal info</h3><textarea data-old="'+info+'" id="personal_info" name="personal_info" class="summernote form-control col-md-12" rows="5">'+ info +'</textarea>');
          $('ul.details li#name').html('<span>Name</span><input type="text" value="'+ name +'" class="form-control" data-old="'+name+'" id="name" name="name" placeholder="Name">');
          $('ul.details li#birthday').html('<span>Birthday</span><input type="date" value="'+ birthday +'" class="form-control" data-old="'+birthday+'" id="birthday" name="birthday" placeholder="Birthday">');
          $('ul.details li#address').html('<span>Address</span><input type="text" value="'+ address +'" class="form-control" data-old="'+address+'" id="address" name="address" placeholder="Address">');
          $('ul.details li#postalcode').html('<span>Postalcode</span><input type="text" value="'+ postalcode +'" class="form-control" data-old="'+postalcode+'" id="postalcode" name="postalcode" placeholder="Postalcode">');
          $('ul.details li#city').html('<span>City</span><input type="text" value="'+ city +'" class="form-control" data-old="'+city+'" id="city" name="city" placeholder="City">');
          $('ul.details li#country').html('<span>Country</span><input type="text" value="'+ country +'" class="form-control" data-old="'+country+'" id="country" name="country" placeholder="Country">');
          $('ul.details li#email').html('<span>Email</span><input type="email" value="'+ email +'" class="form-control" data-old="'+email+'" id="email" name="email" placeholder="Email">');
          $('ul.details li#phone').html('<span>Phone</span><input type="tel" value="'+ phone +'" class="form-control" data-old="'+phone+'" id="phone" name="phone" placeholder="Phone">');
          $('ul.details li#website').html('<span>Website</span><input type="url" value="'+ website +'" class="form-control" data-old="'+website+'" id="website" name="website" placeholder="Website">');
        
          //Set summernote variables
          $('.summernote').summernote({toolbar: [['style', ['bold', 'italic', 'underline', 'clear']],['font', ['strikethrough', 'superscript', 'subscript']],['fontsize', ['fontsize']],['insert', ['hr','table']],['color', ['color']],['para', ['ul', 'ol', 'paragraph']],['height', ['height']],['misc', ['fullscreen']]],height:300});
        }
        else
        {
          //Fetch old data if not saved; Reset
           var quote =  $('#personal_quote').attr('data-old');
           var info =  $('#personal_info').attr('data-old');
           var name =  $('input#name').attr('data-old');
           var birthday =  $('input#birthday').attr('data-old');
           var address =  $('input#address').attr('data-old');
           var postalcode =  $('input#postalcode').attr('data-old');
           var city =  $('input#city').attr('data-old');
           var country =  $('input#country').attr('data-old');
           var email =  $('input#email').attr('data-old');
           var phone =  $('input#phone').attr('data-old');
           var website =  $('input#website').attr('data-old');

          $('#saveChanges').hide();
          $('#profile-quote').html('<blockquote>'+quote+'</blockquote>');
          $('#profile-info').html('<h3>Personal info</h3><p>'+info+'</p>');
          $('ul.details li#name').html('<span>Name</span><a>'+name+'</a>');
          $('ul.details li#birthday').html('<span>Birthday</span><a>'+birthday+'</a>');
          $('ul.details li#address').html('<span>Address</span><a>'+address+'</a>');
          $('ul.details li#postalcode').html('<span>Postalcode</span><a>'+postalcode+'</a>');
          $('ul.details li#city').html('<span>City</span><a>'+city+'</a>');
          $('ul.details li#country').html('<span>Country</span><a>'+country+'</a>');
          $('ul.details li#email').html('<span>Email</span><a href="mailto:'+email+'">'+email+'</a>');
          $('ul.details li#phone').html('<span>Phone</span><a>'+phone+'</a>');
          $('ul.details li#website').html('<span>Website</span><a href="'+website+'">'+website+'</a>');
        }  
    });


$("#avatar").fileinput({
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<svg class="icon-photos-1"><use xlink:href="/fonts/icons.svg#icon-photos-1"></use></svg>',
    removeIcon: '<svg class="icon-cross"><use xlink:href="/fonts/icons.svg#icon-cross"></use></svg>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<svg class="icon-id-8" style="height:100%; width:100%;"><use xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>',
    layoutTemplates: {main2: '{preview} ' + ' {remove} {browse}'},
    allowedFileExtensions: ["jpg", "png", "gif"]
});

})		