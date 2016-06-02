/* 
* @Project:     PlexusMain
* -------------------------------------------
* @Author:      JB Stoker
* @Email:       Jelmer@probo.nl
*
* @File:        user-management.js
* @Path:        C:\PrivateProjects\PlexusMain\config\theme\js\user-management.js
* @Created:     2016-02-08
*
* @Modified by: JB Stoker
* 
* @Copyright:   Copyright (C) Probo - All Rights Reserved 
*               Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
*               Proprietary and confidential
*/
    function isUndef(val) {
        if (val === undefined) {
            return "";
        } else {
            return val;
        }
    }
    function upChar(namestring) {
        if (namestring === undefined) {
            return "";
        } else {
            return namestring.charAt(0).toUpperCase() + ".";
        }
    }
    function isChecked(val) {
        if (val === 'on' || val == 1 || val == '1'){
            return true;
        } else {
            return false;
        }
    }
    function setUid(e){
       $('#userMailTo').val($(e).attr('data-uid'));
    }
jQuery(document).ready(function($) {
    // User management
    function format(d) {
        if (d.key.address === undefined) {
            var street = "";
            var postalcode = "";
            var city = "";
            var country = "";
        } else {
            var street = isUndef(d.key.address.street);
            var postalcode = isUndef(d.key.address.postalcode);
            var city = isUndef(d.key.address.city);
            var country = isUndef(d.key.address.country);
        }
        if (d.key.avatar === undefined) {
            var avatar = '<svg class="icon-id-8" style="height:100%; width:100%;"><use xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>';
        } else {
            var avatar = '<img width="90px" src="/uploads/avatar/' + d.key.avatar + '" class="img-responive img-polaroid"/>';
        }
        switch (d.key.gender) {
          case "male":
            var gender = '<svg class="icon-gender-male"><use xlink:href="fonts/icons.svg#icon-gender-male"></use></svg>';
            break;

          case "female":
            var gender = '<svg class="icon-gender-female"><use xlink:href="fonts/icons.svg#icon-gender-female"></use></svg>';
            break;

          case "intersex":
            var gender = '<svg class="icon-genders"><use xlink:href="fonts/icons.svg#icon-genders"></use></svg>';
            break;

          default:
            var gender = "";
            break;
        }
        return '<table style="color:#ffffff; margin-bottom:-0px;" class="display table" cellspacing="0">' + '<tr style="background-color:#384B5F;">' + '<td rowspan="3" width="90px">' + avatar + "</td>" + '<td style="width:20px"><svg class="icon-house-2"><use xlink:href="fonts/icons.svg#icon-house-2"></use></svg></td>' + '<td colspan="4">' + street + ", " + postalcode + " " + city + " " + country + "</td>" + '<td style="width:20px">' + isUndef(gender) + "</td>" + "<td>" + "</td>" + "</tr>" + '<tr style="background-color:#384B5F;">' + '<td style="width:20px"><svg class="icon-globe-1"><use xlink:href="fonts/icons.svg#icon-globe-1"></use></svg></td>' + '<td colspan="4">' + isUndef(d.key.website) + "</td>" + '<td style="width:20px"><svg class="icon-cake-2"><use xlink:href="fonts/icons.svg#icon-cake-2"></use></svg></td>' + "<td>" + isUndef(d.key.birthday) + "</td>" + "</tr>" + '<tr style="background-color:#384B5F;">' + '<td style="width:20px"><svg class="icon-phone-3"><use xlink:href="fonts/icons.svg#icon-phone-3"></use></svg></td>' + '<td colspan="4">' + isUndef(d.key.phone) + "</td>" + '<td style="width:20px"><svg class="icon-mobile-phone-1"><use xlink:href="fonts/icons.svg#icon-mobile-phone-1"></use></svg></td>' + "<td>" + isUndef(d.key.mobile) + "</td>" + "</tr>" + "</table>";
    }
    var usersTable = $("#users-management").DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: "/get_users",
            type: "POST"
        },
        columns: [ {
            className: "details-control",
            data: "key.surname",
            render: function(data, type, full, meta) {
                return "";
            }
        }, {
            data: "key",
            render: function(data, type, full, meta) {
                if (data.maidenname === undefined || data.maidenname === "") {
                    return isUndef(data.title) + " " + upChar(data.surname) + "" + upChar(data.middlename) + " " + isUndef(data.lastname);
                } else {
                    return isUndef(data.title) + " " + upChar(data.surname) + "" + upChar(data.middlename) + " " + isUndef(data.lastname) + " - " + data.maidenname;
                }
            }
        }, {
            data: "key.email"
        }, {
            data: "key.role",
            render: function(data, type, full, meta) {
                if (data === undefined) {
                    return "User";
                } else {
                    return data.text;
                }
            }
        }, {
            data: "key.acl.status",
            render: function(data, type, full, meta) {
                if (data === "0") {
                    return "Waiting";
                } else {
                    return "Validated";
                }
            }
        }, {
            data: "key.uid",
            orderable: false,
            searchable: false,
            render: function(data, type, full, meta) {
                return '<button class="btn btn-mini btn-primary" data-toggle="modal" onclick="setUid(this)" data-uid="'+data+'" data-target="#mailUserModal"><svg class="icon-mail-2"><use xlink:href="fonts/icons.svg#icon-mail-2"></use></svg></button>';
            }
        }, {
            data: "key.uid",
            orderable: false,
            searchable: false,
            render: function(data, type, full, meta) {
                return '<button class="btn btn-mini btn-warning editUser" id="' + data + '"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>';
            }
        }, {
            data: "key.uid",
            orderable: false,
            searchable: false,
            render: function(data, type, full, meta) {
                return '<button class="btn btn-mini btn-danger dropUser" id="' + data + '" data-text="Are you sure to remove this user?"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';
            }
        } ]
    });
    // Add event listener for opening and closing details
    $("#users-management tbody").on("click", "td.details-control", function() {
        var tr = $(this).closest("tr");
        var row = usersTable.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass("shown");
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass("shown");
        }
    });
    var rolesTable = $("#roles-management").DataTable({
        serverSide: true,
        processing: true,
        ajax: {
            url: "/get_roles",
            type: "POST"
        },
        columns: [ {
            data: "key.name",
            searchable: true
        }, {
            data: "key.read",
            searchable: false,
            render: function(data, type, full, meta) {
                if (data === undefined || data === 0) {
                    return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>';
                } else {
                    return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>';
                }
            }
        }, {
            data: "key.write",
            searchable: false,
            render: function(data, type, full, meta) {
                if (data === undefined || data === 0) {
                    return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>';
                } else {
                    return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>';
                }
            }
        }, {
            data: "key.edit",
            searchable: false,
            render: function(data, type, full, meta) {
                if (data === undefined || data === 0) {
                    return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>';
                } else {
                    return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>';
                }
            }
        }, {
            data: "key.delete",
            searchable: false,
            render: function(data, type, full, meta) {
                if (data === undefined || data === 0) {
                    return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>';
                } else {
                    return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>';
                }
            }
        }, {
            data: "key.publish",
            searchable: false,
            render: function(data, type, full, meta) {
                if (data === undefined || data === 0) {
                    return '<svg style="fill:red;" class="icon-cross-shield"><use xlink:href="fonts/icons.svg#icon-cross-shield"></use></svg>';
                } else {
                    return '<svg style="fill:green;" class="icon-check-shield"><use xlink:href="fonts/icons.svg#icon-check-shield"></use></svg>';
                }
            }
        }, {
            data: "key.uid",
            orderable: false,
            searchable: false,
            render: function(data, type, full, meta) {
                return '<button class="btn btn-mini btn-warning editRole" id="' + data + '"><svg class="icon-edit-3"><use xlink:href="fonts/icons.svg#icon-edit-3"></use></svg></button>';
            }
        }, {
            data: "key.uid",
            orderable: false,
            searchable: false,
            render: function(data, type, full, meta) {
                return '<button class="btn btn-mini btn-danger dropRole" id="' + data + '" data-text="Are you sure to remove this role?"><svg class="icon-bin-2"><use xlink:href="fonts/icons.svg#icon-bin-2"></use></svg></button>';
            }
        } ]
    });
    //UserMailText
    $("#userMailText").summernote({
        toolbar: [ [ "style", [ "bold", "italic", "underline", "clear" ] ], [ "font", [ "strikethrough", "superscript", "subscript" ] ], [ "fontsize", [ "fontsize" ] ], [ "insert", [ "hr", "table" ] ], [ "color", [ "color" ] ], [ "para", [ "ul", "ol", "paragraph" ] ], [ "height", [ "height" ] ], [ "misc", [ "fullscreen" ] ] ],
        height: 300
    });
    $(document).on("click", "#btn-saveUser", function(event) {
        event.preventDefault();
        var data = $("#user-form").serialize();
        var path = $("#user-form").attr("action");
        $.ajax({
            url: path,
            type: "POST",
            data: data
        }).done(function(data){
            if (data.message.type != "danger" && data.message.type != "warning") {
                var table = $("#users-management").DataTable();
                table.row.add({
                    key: {
                        surname: data.user.surname,
                        email: data.user.email,
                        role: data.user.role,
                        acl: data.user.acl,
                        uid: data.user.uid,
                        uid: data.user.uid,
                        uid: data.user.uid
                    }
                }).draw();
            }
            $.notify({
                title: data.message.title,
                message: data.message.msg,
                url: data.message.url,
                target: data.message.target
            }, {
                type: data.message.type
            });
        });
    });
    $(document).on("click", "#btn-saveRole", function(event) {
        event.preventDefault();
        var data = $("#role-form").serialize();
        var path = $("#role-form").attr("action");
        $.ajax({
            url: path,
            type: "POST",
            data: data
        }).done(function(data) {
            if (data.message.type != "danger" && data.message.type != "warning") {
                var table = $("#roles-management").DataTable();
                table.row.add({
                    key: {
                        name: data.role.name,
                        read: data.role.read,
                        write: data.role.write,
                        edit: data.role.edit,
                        "delete": data.role.delete,
                        publish: data.role.publish,
                        uid: data.role.uid,
                        uid: data.role.uid
                    }
                }).draw();
                $("#user-role").append($("<option></option>").val(data.role.uid).html(data.role.name));
            }
            $.notify({
                title: data.message.title,
                message: data.message.msg,
                url: data.message.url,
                target: data.message.target
            }, {
                type: data.message.type
            });
        });
    });
    //Get User for editing
    $(document).on("click", ".editUser", function(e) {
        $.ajax({
            url: "/get-user/" + this.id,
            type: "POST",
            dataType: "JSON"
        }).done(function(data) {
            $("#user-form").attr("action", "/update-user/" + data.uid);
            $("[name=user_accepted]").prop("checked", isChecked(data.acl.status));
            $("#user-id").val(data.uid);
            $("#btn-saveUser").removeClass("btn-primary").addClass("btn-warning").html("Update");
            $("#user-title").val(data.title);
            $("#user-surname").val(data.surname);
            $("#user-middlename").val(data.middlename);
            $("#user-lastname").val(data.lastname);
            $("#user-maidenname").val(data.maidenname);
            $("#user-email").val(data.email);
            $("#user-role").val(data.role.uid);
        }).fail(function() {
            console.log("error");
        });
    });
    $(document).on("click", "#btn-resetUser", function(e){
        $("#user-form").attr("action", "/create-user/");
        $("#btn-saveUser").removeClass("btn-warning").addClass("btn-primary").html("Save");
    });
    $(document).on("click", "#btn-resetRole", function(e){
        $("#role-form").attr("action", "/create-role/");
        $("#btn-saveRole").removeClass("btn-warning").addClass("btn-primary").html("Save");
    });
    $(document).on("click", ".dropUser", function(e) {
        var text = $(this).attr("data-text");
        var id = $(this).attr("id");
        var row = $(this).parents("tr");
        bootbox.confirm(text, function(result) {
            if (result) {
                $.ajax({
                    url: "/delete-user/" + id,
                    type: "POST"
                }).done(function(data) {
                    if (data.message.type != "danger" && data.message.type != "warning") {
                        var table = $("#users-management").DataTable();
                        table.row(row).node().remove();
                    }
                    $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    }, {
                        type: data.message.type
                    });
                }).fail(function(data) {
                    $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    });
                });
            }
        });
    });
    $(document).on("click", ".dropRole", function(e) {
        var text = $(this).attr("data-text");
        var id = $(this).attr("id");
        var row = $(this).parents("tr");
        bootbox.confirm(text, function(result) {
            if (result) {
                $.ajax({
                    url: "/delete-role/" + id,
                    type: "POST"
                }).done(function(data) {
                    if (data.message.type != "danger" && data.message.type != "warning") {
                        var table = $("#roles-management").DataTable();
                        table.row(row).node().remove();
                        $("#user-role option[value='"+id+"']").remove();
                    }
                    $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    }, {
                        type: data.message.type
                    });
                }).fail(function(data) {
                    $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    }, {
                        type: data.message.type
                    });
                });
            }
        });
    });
    //Get User for editing
    $(document).on("click", ".editRole", function(e) {
        $.ajax({
            url: "/get-role/" + this.id,
            type: "POST",
            dataType: "JSON"
        }).done(function(d) {
            var data = d[0].value;
            $("#role-form").attr("action", "/update-role/" + data.uid);
            $("#btn-saveRole").removeClass("btn-primary").addClass("btn-warning").html("Update");
            $("[name=role_name]").val(data.name);
            $("[name=role_read]").prop("checked", isChecked(data.read));
            $("[name=role_write]").prop("checked", isChecked(data.write));
            $("[name=role_edit]").prop("checked", isChecked(data.edit));
            $("[name=role_publish]").prop("checked", isChecked(data.publish));
            $("[name=role_del]").prop("checked", isChecked(data.delete));
        }).fail(function() {
            console.log("error");
        });
    });
    $(document).on('click', '#sendMailToUser', function(event) {
        event.preventDefault();
        var body = encodeURIComponent($('#userMailText').val());
        var to = $('#userMailTo').val();
        var subject = $('#userMailSubject').val();

        $.ajax({
            url: '/sendmail',
            type: 'POST',
            data: {'to':to,'subject':subject,'body':body}
        })
        .done(function(data) {
            $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    }, {
                        type: data.message.type
                    });
        })
        .fail(function(data) {
                $.notify({
                    title: data.message.title,
                    message: data.message.msg,
                    url: data.message.url,
                    target: data.message.target
                }, {
                    type: data.message.type
                });
        });
    });
});