$(document).ready(function() 
{       
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


                    
    $("input[type=password]").keyup(function()
    {
        var ucase = new RegExp("[A-Z]+");
        var lcase = new RegExp("[a-z]+");
        var num = new RegExp("[0-9]+");
        
        if($("#password1").val().length >= 8){
            $("#8char").removeClass("glyphicon-remove");
            $("#8char").addClass("glyphicon-ok");
            $("#8char").css("color","#00A41E");
        }else{
            $("#8char").removeClass("glyphicon-ok");
            $("#8char").addClass("glyphicon-remove");
            $("#8char").css("color","#FF0004");
        }
        
        if(ucase.test($("#password1").val())){
            $("#ucase").removeClass("glyphicon-remove");
            $("#ucase").addClass("glyphicon-ok");
            $("#ucase").css("color","#00A41E");
        }else{
            $("#ucase").removeClass("glyphicon-ok");
            $("#ucase").addClass("glyphicon-remove");
            $("#ucase").css("color","#FF0004");
        }
        
        if(lcase.test($("#password1").val())){
            $("#lcase").removeClass("glyphicon-remove");
            $("#lcase").addClass("glyphicon-ok");
            $("#lcase").css("color","#00A41E");
        }else{
            $("#lcase").removeClass("glyphicon-ok");
            $("#lcase").addClass("glyphicon-remove");
            $("#lcase").css("color","#FF0004");
        }
        
        if(num.test($("#password1").val())){
            $("#num").removeClass("glyphicon-remove");
            $("#num").addClass("glyphicon-ok");
            $("#num").css("color","#00A41E");
        }else{
            $("#num").removeClass("glyphicon-ok");
            $("#num").addClass("glyphicon-remove");
            $("#num").css("color","#FF0004");
        }
                    
        if($("#password1").val() == $("#password2").val()){
            $("#pwmatch").removeClass("glyphicon-remove");
            $("#pwmatch").addClass("glyphicon-ok");
            $("#pwmatch").css("color","#00A41E");
        }else{
            $("#pwmatch").removeClass("glyphicon-ok");
            $("#pwmatch").addClass("glyphicon-remove");
            $("#pwmatch").css("color","#FF0004");
        }
    });

// User management
function format(d){
    return '<table style="color:#ffffff; margin-bottom:-0px;" class="display table" cellspacing="0">'+
        '<tr style="background-color:#384B5F;">'+
            '<td rowspan="3" width="90px"><img width="90px" src="http://placehold.it/400x400" class="img-responive img-polaroid"/></td>'+
            '<td style="width:20px"><svg class="icon-house-2"><use xlink:href="fonts/icons.svg#icon-house-2"></use></svg></td>'+
            '<td>'+d.street +', '+ d.postalcode +' '+ d.city +' '+ d.country +'</td>'+
        '</tr>'+
        '<tr style="background-color:#384B5F;">'+
            '<td style="width:20px"><svg class="icon-globe-1"><use xlink:href="fonts/icons.svg#icon-globe-1"></use></svg></td>'+
            '<td colspan="4">'+d.website+'</td>'+
        '</tr>'+
        '<tr style="background-color:#384B5F;">'+
            '<td style="width:20px"><svg class="icon-phone-3"><use xlink:href="fonts/icons.svg#icon-phone-3"></use></svg></td>'+
            '<td colspan="4">'+d.phone+'</td>'+
        '</tr>'+
    '</table>';
}
    var usersTable = $('#users-management').DataTable({
        "ajax": "/fonts/userstestdata.txt",
        "columns": [
                    {
                        "className":      'details-control',
                        "orderable":      false,
                        "data":           null,
                        "defaultContent": ''
                    },
                    { "data": "name"},
                    { "data": "email"},
                    { "data": "role"},
                    { "data": "status"},
                    { "data": "code", "orderable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-primary" data-toggle="modal" data-target="#mailUserModal"><svg class="icon-mail-2"><use xlink:href="fonts/icons.svg#icon-mail-2"></use></svg></button>'; }},
                    { "data": "code", "orderable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editUser" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "code", "orderable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropUser" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
                  ],
        "order": [[1, 'asc']]
    });
    // Add event listener for opening and closing details
    $('#users-management tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = usersTable.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    });

    var rolesTable= $('#roles-management').DataTable({
        "ajax": "/fonts/rolestestdata.txt",
        "columns": [{ "data": "code"},
                    { "data": "name"},
                    { "data": "read", "render":function(data,type,full,meta){ if(data == true){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "write", "render":function(data,type,full,meta){ if(data == true){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "edit", "render":function(data,type,full,meta){ if(data == true){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "accept", "render":function(data,type,full,meta){ if(data == true){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "code", "orderable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editRole" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "code", "orderable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropRole" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
                  ],
        "order": [[1, 'asc']]
    });

          //UserMailText
          $('#userMailText').summernote({toolbar: [['style', ['bold', 'italic', 'underline', 'clear']],['font', ['strikethrough', 'superscript', 'subscript']],['fontsize', ['fontsize']],['insert', ['hr','table']],['color', ['color']],['para', ['ul', 'ol', 'paragraph']],['height', ['height']],['misc', ['fullscreen']]],height:300});
})
