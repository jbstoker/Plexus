/* 
* @Project: 	PlexusMain
* -------------------------------------------
* @Author:		JB Stoker
* @Email:  		Jelmer@probo.nl
*
* @File: 		user-management.js
* @Path:		C:\PrivateProjects\PlexusMain\config\theme\js\user-management.js
* @Created:   	2016-02-08
*
* @Modified by:	JB Stoker
* 
* @Copyright:	Copyright (C) Probo - All Rights Reserved 
*				Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*				Proprietary and confidential
*/			 			 
jQuery(document).ready(function($) {
	// User management
function format(d){
    return '<table style="color:#ffffff; margin-bottom:-0px;" class="display table" cellspacing="0">'+
        '<tr style="background-color:#384B5F;">'+
            '<td rowspan="3" width="90px"><img width="90px" src="/uploads/avatar/'+d.avatar+'" class="img-responive img-polaroid"/></td>'+
            '<td style="width:20px"><svg class="icon-house-2"><use xlink:href="fonts/icons.svg#icon-house-2"></use></svg></td>'+
            '<td>'+d.address.street +', '+ d.address.postalcode +' '+ d.address.city +' '+ d.address.country +'</td>'+
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
        "serverSide":true,
        "processing":true,
        "ajax": {"url":"/get_users", "type":"POST"},
        "columns": [{"className": 'details-control',"data": "name", "render":function(data,type,full,meta){ return ''; }},
                    { "data": "name"},
                    { "data": "email"},
                    { "data": "acl.code"},
                    { "data": "acl.status"},
                    { "data": "_id", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-primary" data-toggle="modal" data-target="#mailUserModal"><svg class="icon-mail-2"><use xlink:href="fonts/icons.svg#icon-mail-2"></use></svg></button>'; }},
                    { "data": "_id", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editUser" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "_id", "orderable": false,"searchable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropUser" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
                  ]
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
        "serverSide":true,
        "processing":true,
        "ajax": {"url":"/get_roles", "type":"POST"},
        "columns": [{ "data": "_id", "searchable": false},
                    { "data": "name","searchable": true},
                    { "data": "read","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "write","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "edit","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "delete","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "publish","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "_id", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editRole" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "_id", "orderable": false,"searchable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropRole" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
                  ]
    });

//UserMailText
$('#userMailText').summernote({toolbar: [['style', ['bold', 'italic', 'underline', 'clear']],['font', ['strikethrough', 'superscript', 'subscript']],['fontsize', ['fontsize']],['insert', ['hr','table']],['color', ['color']],['para', ['ul', 'ol', 'paragraph']],['height', ['height']],['misc', ['fullscreen']]],height:300});


//Get User for editing
$(document).on('click','.editUser',function(e){
    $.ajax({
        url: '/get-user/'+this.id,
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data){
        $('#user-form').attr('action', '/update-user/'+data._id);
        $('#user-accepted').val(data.acl.status);
        $('#btn-saveUser').removeClass('btn-primary').addClass('btn-warning').html('Update');
        $('#user-name').val(data.name);
        $('#user-email').val(data.email);
        $('#user-role').val(data.role);
    }).fail(function() {
        console.log("error");
    });
});


});