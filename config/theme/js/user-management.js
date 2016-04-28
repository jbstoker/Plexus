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

function isUndef(val){
    if(val === undefined)
    {

        return '';
    }
    else
    {
        return val;
    }    
}	

    // User management
function format(d){

if(d.key.address === undefined)
{
    var street = '';
    var postalcode = '';
    var city = '';
    var country = '';
}
else
{
    var street = isUndef(d.key.address.street);
    var postalcode = isUndef(d.key.address.postalcode);
    var city = isUndef(d.key.address.city);
    var country = isUndef(d.key.address.country);  
}

if(d.key.avatar === undefined)
{
    var avatar = '<svg class="icon-id-8" style="height:100%; width:100%;"><use xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>';
}
else
{
    var avatar = '<img width="90px" src="/uploads/avatar/'+d.key.avatar+'" class="img-responive img-polaroid"/>';
}

    return '<table style="color:#ffffff; margin-bottom:-0px;" class="display table" cellspacing="0">'+
        '<tr style="background-color:#384B5F;">'+
            '<td rowspan="3" width="90px">'+avatar+'</td>'+
            '<td style="width:20px"><svg class="icon-house-2"><use xlink:href="fonts/icons.svg#icon-house-2"></use></svg></td>'+
            '<td>'+street +', '+ postalcode +' '+ city +' '+ country +'</td>'+
        '</tr>'+
        '<tr style="background-color:#384B5F;">'+
            '<td style="width:20px"><svg class="icon-globe-1"><use xlink:href="fonts/icons.svg#icon-globe-1"></use></svg></td>'+
            '<td colspan="4">'+isUndef(d.key.website)+'</td>'+
        '</tr>'+
        '<tr style="background-color:#384B5F;">'+
            '<td style="width:20px"><svg class="icon-phone-3"><use xlink:href="fonts/icons.svg#icon-phone-3"></use></svg></td>'+
            '<td colspan="4">'+isUndef(d.key.phone)+'</td>'+
        '</tr>'+
    '</table>';
}
    var usersTable = $('#users-management').DataTable({
        "serverSide":true,
        "processing":true,
        "ajax": {"url":"/get_users", "type":"POST"},
        "columns": [{"className": 'details-control',"data": "key.name", "render":function(data,type,full,meta){ return ''; }},
                    { "data": "key.name"},
                    { "data": "key.email"},
                    { "data": "key.role","render":function(data,type,full,meta){ if(data === undefined){ return 'User'; }else{ return data; }}},
                    { "data": "key.acl.status","render":function(data,type,full,meta){ if(data === '0'){ return 'Waiting'; }else{ return 'Validated'; }}},
                    { "data": "key.uid", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-primary" data-toggle="modal" data-target="#mailUserModal"><svg class="icon-mail-2"><use xlink:href="fonts/icons.svg#icon-mail-2"></use></svg></button>'; }},
                    { "data": "key.uid", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editUser" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "key.uid", "orderable": false,"searchable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropUser" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
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
        "columns": [ { "data": "key.name","searchable": true},
                    { "data": "key.read","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "key.write","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "key.edit","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "key.delete","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "key.publish","searchable": false, "render":function(data,type,full,meta){ if(data === false){ return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>'; }else{ return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>'; }}},
                    { "data": "key.uid", "orderable": false,"searchable": false, "render":function(data,type,full,meta){ return '<button class="btn btn-mini btn-warning editRole" id="'+data+'"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>'; }},
                    { "data": "key.uid", "orderable": false,"searchable": false, "render":function(data,type,full,meta){return '<button class="btn btn-mini btn-danger dropRole" id="'+data+'"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';}}  
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
        $('#user-form').attr('action', '/update-user/'+data.uid);
        if(data.acl.status === undefined || data.acl.status === '0')
        {
            $('#user-accepted').bootstrapToggle('off');
        }
        else
        {
            $('#user-accepted').bootstrapToggle('on');
        }    
        $('#user-id').val(data.uid);
        $('#btn-saveUser').removeClass('btn-primary').addClass('btn-warning').html('Update');
        $('#user-name').val(data.name);
        $('#user-email').val(data.email);
        $('#user-role').val(data.role);
    }).fail(function() {
        console.log("error");
    });
});

//Get User for editing
$(document).on('click','.editRole',function(e){
    
    $.ajax({
        url: '/get-role/'+this.id,
        type: 'POST',
        dataType: 'JSON'
    }).done(function(data){
        $('#role-form').attr('action', '/update-role/'+data.uid);
        if(data.acl.status === undefined || data.acl.status === '0')
        {
            $('#user-accepted').bootstrapToggle('off');
        }
        else
        {
            $('#user-accepted').bootstrapToggle('on');
        }    
        
    }).fail(function() {
        console.log("error");
    });
});


});