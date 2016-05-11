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


$('.editProfile').click(function(event) {
        //Check if swicth is selected  
        if($(this).prop('checked'))
        {
          //Fetch existig data
           var avatar = $('#profile-image').attr('data-img');
           var id = $('#profile-image').attr('data-user');
           var quote =  $('#profile-quote blockquote').html();
           var info =  $('#profile-info .info-text').html();

          var title = $('[name=title]').html(); 
          var titleelem = '<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">'+
                          '<div class="input-group input-group-sm"><span class="input-group-addon profile" style="min-width:100px;" id="title">Title</span>'+
                          '<select class="form-control" placeholder="title" aria-describedby="title" name="title" data-old="'+title+'">'+  
                          '<option value="Ms">Ms</option><option value="Miss">Miss</option>'+
                          '<option value="Mrs">Mrs</option>'+
                          '<option value="Mr">Mr</option>'+
                          '<option value="Master">Master</option>'+
                          '<option value="Rev">Rev (Reverend)</option>'+
                          '<option value="Fr">Fr (Father)</option>'+
                          '<option value="Dr">Dr (Doctor)</option>'+
                          '<option value="Atty">Atty (Attorney)</option>'+
                          '<option value="Prof">Prof (Professor)</option>'+
                          '<option value="Hon">Hon (Honorable)</option>'+
                          '<option value="Pres">Pres (President)</option>'+
                          '<option value="Gov">Gov (Governor)</option>'+
                          '<option value="Coach">Coach</option>'+
                          '<option value="Ofc">Ofc (Officer)</option>'+
                          '</select></div></div>';

          var surname = $('[name=surname]').html();
          var middlename= $('[name=middlename]').html();
          var lastname = $('[name=lastname]').html();
          var maidenname = $('[name=maidenname]').html();

          var nameelem =  '<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">'+
                          '<div class="input-group input-group-sm"><span class="input-group-addon profile" style="min-width:100px;" id="surname">Fullname</span>'+
                          '<input type="text" class="form-control" placeholder="Surname" aria-describedby="surname" name="surname" data-old="'+surname+'" value="'+surname+'">'+
                          '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class=" input-group-sm">'+
                          '<input type="text" class="form-control" placeholder="Middlename" aria-describedby="middlename" name="middlename" data-old="'+middlename+'" value="'+middlename+'">'+
                          '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="input-group-sm">'+
                          '<input type="text" class="form-control" placeholder="Lastname" aria-describedby="lastname" name="lastname" data-old="'+lastname+'" value="'+lastname+'">'+
                          '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="input-group-sm">'+
                          '<input type="text" class="form-control" placeholder="Maidenname" aria-describedby="maidenname" name="maidenname" data-old="'+maidenname+'" value="'+maidenname+'"></div></div>';

          var gender = $('#genderrow').attr('data-text');

          var genderelem = '<div class="btn-group input-group-sm" style="width:100%" id="gendergroup" data-old="'+gender+'">'+
                         '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isMale" name="gender" value="Male"/> Male </label>'+
                         '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isFemale" name="gender" value="Female"/> Female </label>'+
                         '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isInter" name="gender" value="Intersex"/> Intersex </label>'+
                         '</div>';

           var birthday =  $('[name=birthday]').val();
           var email =  $('[name=email]').val();
           var phone =  $('[name=phone]').val();
           var mobile =  $('[name=mobile]').val();
           var website =  $('[name=website]').val();

           var address =  $('[name=address]').val();
           var number = $('[name=number]').val();

           var postalcode =  $('[name=postalcode]').val();
           var city =  $('[name=city]').val();
           var country =  $('[name=country]').val();


           //Generate input fields for update profile
          $('#saveChanges').show();
          $('#profile-quote').html('<textarea data-old="'+encodeURIComponent(quote)+'" id="personal_quote" name="personal_quote" class="form-control col-md-12" rows="3">'+quote+'</textarea>');
          $('#profile-info').html('<h3>Personal info</h3><textarea data-old="'+encodeURIComponent(info)+'" id="personal_info" name="personal_info" class="summernote form-control col-md-12" rows="5">'+info+'</textarea>');

          
          $('#titlerow').html(titleelem);
          $('#namerow').html(nameelem);
          $('#genderrow').html(genderelem);


          $('[name=gender][value='+gender+']').attr('checked', true);



          $('[name=birthday]').attr('data-old', birthday).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=email]').attr('data-old', email).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=phone]').attr('data-old', phone).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=mobile]').attr('data-old', mobile).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=website]').attr('data-old', website).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=address]').attr('data-old', address).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=number]').attr('data-old', number).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=postalcode]').attr('data-old', postalcode).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=city]').attr('data-old', city).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });
          $('[name=country]').attr('data-old', country).css({
              'pointer-events': 'auto',
              border: '1px solid #cccccc',
              '-webkit-box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)',
              'box-shadow': 'inset 0 1px 1px rgba(0,0,0,0.075)'
          });


          $('#profile-image').html('<div id="kv-avatar-errors" style="width:100%; display:none"></div><form class="text-center" method="post" enctype="multipart/form-data"><div class="kv-avatar center-block"><input id="avatar" data-old="'+avatar+'" name="avatar" type="file" class="file-loading" data-upload-url="/update-avatar/'+id+'"></div></form>');

          //Set summernote variables
          $('.summernote').summernote({toolbar: [['style', ['bold', 'italic', 'underline', 'clear']],['font', ['strikethrough', 'superscript', 'subscript']],['fontsize', ['fontsize']],['insert', ['hr','table']],['color', ['color']],['para', ['ul', 'ol', 'paragraph']],['height', ['height']],['misc', ['fullscreen']]],height:300});
          
          $("#avatar").fileinput({initialPreview: ["<img src='/uploads/avatar/" + avatar + "' class='file-preview-image' id='avatar-img' alt='avatar' title='avatar'>"],
                                  overwriteInitial: true,
                                  autoReplace: true,
                                  initialPreviewShowDelete:false,
                                  maxFileSize: 1500,
                                  showClose: false,
                                  showCaption: false,
                                  browseLabel: '',
                                  removeLabel: '',
                                  uploadLabel: '',
                                  browseIcon: '<svg class="icon-photos-1"><use xlink:href="/fonts/icons.svg#icon-photos-1"></use></svg>',
                                  removeIcon: '<svg class="icon-cross"><use xlink:href="/fonts/icons.svg#icon-cross"></use></svg>',
                                  uploadIcon: '<svg class="icon-upload-5"><use xlink:href="/fonts/icons.svg#icon-upload-5"></use></svg>',
                                  removeTitle: 'Cancel or reset changes',
                                  elErrorContainer: '#kv-avatar-errors',
                                  msgErrorClass: 'alert alert-block alert-danger',
                                  defaultPreviewContent: '<svg class="icon-id-8" style="height:100%; width:100%;"><use xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>',
                                  layoutTemplates: {
                                                    main2: '{preview} ' + ' {remove} {browse} {upload}',  
                                                    footer: '<div class="file-thumbnail-footer">\n' +
                                                            '    {progress}\n\n' +
                                                            '</div>',  
                                                    btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css} btn btn-sm btn-danger"{status}>{icon}{label}</button>',
                                                    btnLink: '<a href="{href}" tabindex="500" title="{title}" class="{css}  btn btn-sm btn-warning"{status}>{icon}{label}</a>'
                                                   },
                                  allowedFileExtensions: ["jpg", "png", "gif"],
                                  uploadExtraData: function(){
                                                        return {  x: document.getElementById('profile-image').getAttribute('data-x'), 
                                                                  y: document.getElementById('profile-image').getAttribute('data-y'),
                                                                  width: document.getElementById('profile-image').getAttribute('data-width'),
                                                                  height: document.getElementById('profile-image').getAttribute('data-height'),
                                                                  user: document.getElementById('profile-image').getAttribute('data-user')
                                                                };
                                                              }                   
                              }).on('fileloaded', function(event, file, previewId, index, reader) 
                              {
                                var image = $('.file-preview-image').cropper({
                                  aspectRatio: 200 / 200,
                                  crop: function(data) 
                                  {
                                    document.getElementById('profile-image').setAttribute('data-x',data.x);
                                    document.getElementById('profile-image').setAttribute('data-y',data.y);
                                    document.getElementById('profile-image').setAttribute('data-width',data.width);
                                    document.getElementById('profile-image').setAttribute('data-height',data.height);  
                                  }
                                });
                              }).on('fileuploaded',function(event, data, previewId, index){
                                  var url  = data.response;
                                  $('#profile-image').attr('data-img',url);
                                  $('#menu-avatar').attr('src', '/uploads/avatar/'+url);
                                  $('#avatar').attr('data-old', url);
                                  $('#avatar').fileinput('clear').fileinput('refresh',{initialPreview: ["<img src='/uploads/avatar/" + url + "' class='file-preview-image' id='avatar-img' alt='avatar' title='avatar'>"], overwriteInitial: true}).fileinput('enable');

                              }); 
        }
        else
        {
          //Fetch old data if not saved; Reset
           var avatar = $('#avatar').attr('data-old'); 
           var quote = decodeURIComponent($('#personal_quote').attr('data-old'));
           var info = decodeURIComponent($('#personal_info').attr('data-old'));

           var title = $('[name=title]').attr('data-old');              
           var surname = $('[name=surname]').attr('data-old'); 
           var middlename= $('[name=middlename]').attr('data-old');
           var lastname = $('[name=lastname]').attr('data-old');
           var maidenname = $('[name=maidenname]').attr('data-old');

           $('#titlerow').html('');
           var nameelem = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><span name="title">'+title+'</span><span name="surname">'+surname+'</span><span name="middlename">'+middlename+'</span><span name="lastname">'+lastname+'</span><span name="maidenname">'+maidenname+'</span></div>';
           $('#namerow').html(nameelem);

           var gender = $('[name=gender]').attr('data-old');

           var birthday =  $('[name=birthday]').attr('data-old');
           var email =  $('[name=email]').attr('data-old');
           var phone =  $('[name=phone]').attr('data-old');
           var mobile =  $('[name=mobile]').attr('data-old');
           var website =  $('[name=website]').attr('data-old');

           var address =  $('[name=address]').attr('data-old');
           var number = $('[name=number]').attr('data-old');

           var postalcode =  $('[name=postalcode]').attr('data-old');
           var city =  $('[name=city]').attr('data-old');
           var country =  $('[name=country]').attr('data-old');

          $('#saveChanges').hide();
          $('#profile-image').html('<img src="/uploads/avatar/'+avatar+'"  width="100%" class="img-responsive img-thumbnail"/>');
          $('#profile-quote').html('<blockquote>'+quote+'</blockquote>');
          $('#profile-info').html('<h3>Personal info</h3><div class="info-text">'+info+'</div>');

          $('[name=title]').attr('data-old', title).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=surname]').attr('data-old', surname).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=middlename]').attr('data-old', middlename).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=lastname]').attr('data-old', lastname).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=maidenname]').attr('data-old', maidenname).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=gender]').attr('data-old', gender).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=birthday]').attr('data-old', birthday).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=email]').attr('data-old', email).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=phone]').attr('data-old', phone).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=mobile]').attr('data-old', mobile).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=website]').attr('data-old', website).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=address]').attr('data-old', address).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=number]').attr('data-old', number).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=postalcode]').attr('data-old', postalcode).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=city]').attr('data-old', city).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
          $('[name=country]').attr('data-old', country).css({
              'pointer-events': 'none',
              border: 'none',
              '-webkit-box-shadow': 'none',
              'box-shadow': 'none'
          });
        }  
});



})		