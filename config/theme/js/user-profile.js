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
			
//Recent work carousel on profile page
$('#recentWork').carousel();
//Edit Profile toggle
$('#editProfile').change(function(){
	
        //Check if swicth is selected  
        if($(this).prop('checked'))
        {
          //Fetch existig data
           var image =  $('#profile-image img').attr('src');
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
          $('#profile-quote').html('<textarea id="personal-quote" class="form-control col-md-12" rows="3">'+quote+'</textarea>');
          $('#profile-info').html('<h3>Personal info</h3><textarea id="personal-info" class="summernote form-control col-md-12" rows="5">'+ info +'</textarea>');
          $('ul.details li#name').html('<span>Name</span><input type="text" value="'+ name +'" class="form-control" id="name" placeholder="Name">');
          $('ul.details li#birthday').html('<span>Birthday</span><input type="date" value="'+ birthday +'" class="form-control" id="birthday" placeholder="Birthday">');
          $('ul.details li#address').html('<span>Address</span><input type="text" value="'+ address +'" class="form-control" id="address" placeholder="Address">');
          $('ul.details li#postalcode').html('<span>Postalcode</span><input type="text" value="'+ postalcode +'" class="form-control" id="postalcode" placeholder="Postalcode">');
          $('ul.details li#city').html('<span>City</span><input type="text" value="'+ city +'" class="form-control" id="city" placeholder="City">');
          $('ul.details li#country').html('<span>Country</span><input type="text" value="'+ country +'" class="form-control" id="country" placeholder="Country">');
          $('ul.details li#email').html('<span>Email</span><input type="email" value="'+ email +'" class="form-control" id="Email" placeholder="Email">');
          $('ul.details li#phone').html('<span>Phone</span><input type="tel" value="'+ phone +'" class="form-control" id="phone" placeholder="Phone">');
          $('ul.details li#website').html('<span>Website</span><input type="url" value="'+ website +'" class="form-control" id="website" placeholder="Website">');
        
          //Set summernote variables
          $('.summernote').summernote({toolbar: [['style', ['bold', 'italic', 'underline', 'clear']],['font', ['strikethrough', 'superscript', 'subscript']],['fontsize', ['fontsize']],['insert', ['hr','table']],['color', ['color']],['para', ['ul', 'ol', 'paragraph']],['height', ['height']],['misc', ['fullscreen']]],height:300});
        }
        else
        {
          $('#saveChanges').hide();
          $('#profile-quote').html('<blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</blockquote>');
          $('#profile-info').html('<h3>Personal info</h3><p>Hey there! I am Ipsum Lorem from Lorem island. Vivamus eu metus condimentum lectus ultrices aliquam eget in dui. Ut ultrices ante malesuada est consequat bibendum. Quisque sed metus lacinia mauris sollicitudin euismod nec ac sem. Aenean ac libero et purus sodales ornare fermentum porta lectus. Nam vel rhoncus lectus, ac mattis nunc. In posuere ante ut tempor tincidunt. Integer mattis vel lectus cursus aliquam. Morbi pretium sem massa, ac imperdiet massa elementum ac. Curabitur aliquet aliquam iaculis. Aliquam fermentum, diam id aliquam maximus, metus augue sodales justo, rutrum tincidunt ligula nunc nec ex. Vivamus cursus sodales magna, quis sodales nulla rhoncus ac. Curabitur euismod, dolor a malesuada viverra, dui lectus consectetur quam, sit amet tempus mi ex eu lectus. Donec sapien quam, gravida eu massa vel, maximus ornare nisi. Maecenas in ligula scelerisque, viverra mauris vel, gravida nisl. Nunc rhoncus efficitur tellus a posuere</p>');
          $('ul.details li#name').html('<span>Name</span><a>Ash Dreamer</a>');
          $('ul.details li#birthday').html('<span>Birthday</span><a>1983-10-10</a>');
          $('ul.details li#address').html('<span>Address</span><a>Creative Avenue,</a><a>Mauritius</a>');
          $('ul.details li#postalcode').html('<span>Postalcode</span><a>9005 MH</a>');
          $('ul.details li#city').html('<span>City</span><a>Wergea</a>');
          $('ul.details li#country').html('<span>Country</span><a>Netherlands</a>');
          $('ul.details li#email').html('<span>Email</span><a href="mailto:contact@simplesphere.com" oldtitle="Get in touch">contact@contact.com</a>');
          $('ul.details li#phone').html('<span>Phone</span><a>+00 230 790-1171');
          $('ul.details li#website').html('<span>Website</span><a href="http://www.simplesphere.net" oldtitle="Simplesphere">www.simplesphere.net</a>');
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