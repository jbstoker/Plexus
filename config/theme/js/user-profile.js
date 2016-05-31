/* 
 * @Project:   PlexusMain
 * -------------------------------------------
 * @Author:    JB Stoker
 * @Email:     Jelmer@probo.nl
 *
 * @File:    user-profile.js
 * @Path:    C:\PrivateProjects\PlexusMain\config\theme\js\user-profile.js
 * @Created:     2016-02-08
 *
 * @Modified by: JB Stoker
 *
 * @Copyright: Copyright (C) Probo - All Rights Reserved
 *       Unauthorized copying, or using code of this file, trough any medium is strictly prohibited
 *       Proprietary and confidential
 */
jQuery(document).ready(function($) {
    function isUndef(val) {
        if (val === undefined) {
            return '';
        } else {
            return val;
        }
    }
    //Edit Profile toggle
    $(".editProfile").click(function(event) {
        //Check if swicth is selected  
        if ($(this).prop("checked")) {
            //Fetch existig data
            var id = $("#profile-image").attr("data-user");
            var avatar = $("#profile-image").attr("data-img");
            var quote = $("#profile-quote blockquote").html();
            var info = $("#profile-info .info-text").html();
            var title = $("#info-title").attr("data-title");
            var surname = $("#info-title").attr("data-surname");
            var middlename = $("#info-title").attr("data-middlename");
            var lastname = $("#info-title").attr("data-lastname");
            var maidenname = $("#info-title").attr("data-maidenname");
            var gender = $("#genderrow").attr("data-text");
            var birthday = $("#birthday-group #birthday-span").html();
            var email = $("#email-group").attr('data-old');
            var phone = $("#phone-group").attr('data-old');
            var mobile = $("#mobile-group").attr('data-old');
            var website = $("#website-group #website-span").html();
            var street = $("#address-group #street-span").html();
            var number = $("#address-group #number-span").html();
            var postalcode = $("#postalcode-group #postalcode-span").html();
            var city = $("#city-group #city-span").html();
            var country = $("#country-group #country-span").html();
            var titleelem = '<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">' + '<div class="input-group input-group-sm"><span class="input-group-addon profile" style="min-width:100px;" id="title">Title</span>' + '<select class="form-control" placeholder="title" aria-describedby="title" name="title" data-old="' + isUndef(title) + '">' + '<option value="Ms">Ms</option><option value="Miss">Miss</option>' + '<option value="Mrs">Mrs</option>' + '<option value="Mr">Mr</option>' + '<option value="Master">Master</option>' + '<option value="Rev">Rev (Reverend)</option>' + '<option value="Fr">Fr (Father)</option>' + '<option value="Dr">Dr (Doctor)</option>' + '<option value="Atty">Atty (Attorney)</option>' + '<option value="Prof">Prof (Professor)</option>' + '<option value="Hon">Hon (Honorable)</option>' + '<option value="Pres">Pres (President)</option>' + '<option value="Gov">Gov (Governor)</option>' + '<option value="Coach">Coach</option>' + '<option value="Ofc">Ofc (Officer)</option>' + "</select></div></div>";
            var nameelem = '<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6">' + '<div class="input-group input-group-sm"><span class="input-group-addon profile" style="min-width:100px;" id="surname">Fullname</span>' + '<input type="text" class="form-control" placeholder="Surname" aria-describedby="surname" name="surname" data-old="' + isUndef(surname) + '" value="' + isUndef(surname) + '">' + '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class=" input-group-sm">' + '<input type="text" class="form-control" placeholder="Middlename" aria-describedby="middlename" name="middlename" data-old="' + isUndef(middlename) + '" value="' + isUndef(middlename) + '">' + '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="input-group-sm">' + '<input type="text" class="form-control" placeholder="Lastname" aria-describedby="lastname" name="lastname" data-old="' + isUndef(lastname) + '" value="' + isUndef(lastname) + '">' + '</div></div><div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6"><div class="input-group-sm">' + '<input type="text" class="form-control" placeholder="Maidenname" aria-describedby="maidenname" name="maidenname" data-old="' + isUndef(maidenname) + '" value="' + isUndef(maidenname) + '"></div></div>';
            var genderelem = '<div class="btn-group input-group-sm" style="width:100%" id="gendergroup" data-old="' + isUndef(gender) + '">' + '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isMale" name="gender" value="male"/> Male </label>' + '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isFemale" name="gender" value="female"/> Female </label>' + '<label class="btn btn-sm btn-default" style="width:33.3333%;"> <input type="radio" id="isInter" name="gender" value="intersex"/> Intersex </label>' + "</div>";
            var birthday_group = '<span class="input-group-addon profile" style="min-width:100px;" id="birthday">Birthday</span><input type="date" class="form-control" placeholder="Birthday" aria-describedby="birthday" name="birthday" data-old="' + isUndef(birthday) + '" value="' + isUndef(birthday) + '">';
            var phone_group = '<span class="input-group-addon profile" style="min-width:100px;" id="phone">Phone</span><input type="tel" class="form-control" placeholder="+31 515552255" aria-describedby="phone" name="phone" data-old="' + isUndef(phone) + '" value="' + isUndef(phone) + '">';
            var mobile_group = '<span class="input-group-addon profile" style="min-width:100px;" id="mobile">Mobile</span><input type="tel" class="form-control" placeholder="+31 615552255" aria-describedby="mobile" name="mobile" data-old="' + isUndef(mobile) + '" value="' + isUndef(mobile) + '">';
            var email_group = '<span class="input-group-addon profile" style="min-width:100px;" id="email">Email</span><input type="email" class="form-control" placeholder="Email" aria-describedby="email" name="email" data-old="' + isUndef(email) + '" value="' + isUndef(email) + '">';
            var website_group = '<span class="input-group-addon profile" style="min-width:100px;" id="website">Website</span><input type="url" class="form-control" placeholder="http://www.website.com" aria-describedby="website" name="website" data-old="' + isUndef(website) + '" value="' + isUndef(website) + '">';
            var address_group = '<span class="input-group-addon profile" style="min-width:100px;" id="address">Address</span><input type="text" class="form-control" style="width:150%" placeholder="Address" aria-describedby="address" name="address" data-old="' + isUndef(street) + '" value="' + isUndef(street) + '"><span class="input-group-btn" style="width:0px;"></span><input type="text" class="form-control" style="width:50%; float:right" placeholder="Nr" aria-describedby="number" name="number" data-old="' + isUndef(number) + '" value="' + isUndef(number) + '">';
            var postalcode_group = '<span class="input-group-addon profile" style="min-width:100px;" id="postalcode">Postalcode</span><input type="text" class="form-control" placeholder="Postalcode" aria-describedby="postalcode" name="postalcode" data-old="' + isUndef(postalcode) + '" value="' + isUndef(postalcode) + '">';
            var city_group = '<span class="input-group-addon profile" style="min-width:100px;" id="city">City</span><input type="text" class="form-control" placeholder="City" aria-describedby="city" name="city" data-old="' + isUndef(city) + '" value="' + isUndef(city) + '">';
            var country_group = '<span class="input-group-addon profile" style="min-width:100px;" id="country">Country</span><input type="text" class="form-control" placeholder="Country" aria-describedby="country" name="country" data-old="' + isUndef(country) + '" value="' + isUndef(country) + '">';
            //Generate input fields for update profile
            $("#saveChanges").show();
            $("#profile-quote").html('<textarea maxlength="150" data-old="' + encodeURIComponent(quote) + '" id="personal_quote" name="personal_quote" class="form-control col-md-12" rows="3">' + isUndef(quote) + "</textarea><span class='help-block'>Max. 150 characters.</span>");
            $("#profile-info").html('<h3 id="info-title">Personal info</h3><span class="help-block">Max. 750 characters.</span><textarea  data-old="' + encodeURIComponent(info) + '" id="personal_info" name="personal_info" class="summernote form-control col-md-12" rows="5">' + isUndef(info) + "</textarea>");
            $("#titlerow").html(titleelem);
            $("#namerow").html(nameelem);
            $("#genderrow").html(genderelem).show();
            $("[name=gender][value=" + gender + "]").attr("checked", true);
            $("[name=title]").val(title);
            $("#birthday-group").html(birthday_group);
            $("#phone-group").html(phone_group);
            $("#mobile-group").html(mobile_group);
            $("#email-group").html(email_group);
            $("#website-group").html(website_group);
            var addresselem = '<div class="form-group"><div class="input-group input-group-sm">' + address_group + "</div></div>" + '<div class="form-group"><div class="input-group input-group-sm">' + postalcode_group + "</div></div>" + '<div class="form-group"><div class="input-group input-group-sm">' + city_group + "</div></div>" + '<div class="form-group"><div class="input-group input-group-sm">' + country_group + "</div></div>";
            $("#address-row").html(addresselem);
            $("#address-hr").show();
            $("#profile-image").html('<div id="kv-avatar-errors" style="width:100%; display:none"></div><form class="text-center" method="post" enctype="multipart/form-data"><div class="kv-avatar center-block"><input id="avatar" data-old="' + avatar + '" name="avatar" type="file" class="file-loading" data-upload-url="/update-avatar/' + id + '"></div></form>');
            //Set summernote variables
            $(".summernote").summernote({
                fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande', 'Open Sans', 'Tahoma', 'Times New Roman', 'Verdana'],
                toolbar: [
                    ["style", ["bold", "italic", "underline", "clear"]],
                    ["font", ["strikethrough", "superscript", "subscript"]],
                    ["fontsize", ["fontsize"]],
                    ["fontname", ["fontname"]],
                    ["insert", ["hr", "table"]],
                    ["color", ["color"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["height", ["height"]],
                    ["misc", ["fullscreen"]]
                ],
                height: 300,
                callbacks: {
                    onKeydown: function(e) {
                        var text = $(this).parent().find('.note-editor .note-editable').text();
                        var num = text.length;
                        var key = e.keyCode;
                        allowed_keys = [8, 37, 38, 39, 40, 46]
                        if ($.inArray(key, allowed_keys) != -1) {
                            return true
                        }
                        if (num > 750) {
                            e.preventDefault();
                            e.stopPropagation()
                        }
                    },
                    onPaste: function(e) {
                        $.notify({
                            title: 'Warning!',
                            message: 'Pasting is not allowed!',
                            url: '',
                            target: ''
                        }, {
                            type: 'warning'
                        });
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            });
            if (avatar.length > 0) {
                var previewAvatar = "<img src='/uploads/avatar/" + avatar + "' class='file-preview-image' id='avatar-img' alt='avatar' title='avatar'>";
            } else {
                var previewAvatar = '<svg class="icon-id-8" style="height:100%;width:100%;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>';
            }
            $("#avatar").fileinput({
                initialPreview: [previewAvatar],
                overwriteInitial: true,
                autoReplace: true,
                initialPreviewShowDelete: false,
                maxFileSize: 1500,
                showClose: false,
                showCaption: false,
                browseLabel: "",
                removeLabel: "",
                uploadLabel: "",
                browseIcon: '<svg class="icon-photos-1"><use xlink:href="/fonts/icons.svg#icon-photos-1"></use></svg>',
                removeIcon: '<svg class="icon-cross"><use xlink:href="/fonts/icons.svg#icon-cross"></use></svg>',
                uploadIcon: '<svg class="icon-upload-5"><use xlink:href="/fonts/icons.svg#icon-upload-5"></use></svg>',
                removeTitle: "Cancel or reset changes",
                elErrorContainer: "#kv-avatar-errors",
                msgErrorClass: "alert alert-block alert-danger",
                defaultPreviewContent: '<svg class="icon-id-8" style="height:100%; width:100%;"><use xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>',
                layoutTemplates: {
                    main2: "{preview} " + " {remove} {browse} {upload}",
                    footer: '<div class="file-thumbnail-footer">\n' + "    {progress}\n\n" + "</div>",
                    btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css} btn btn-sm btn-danger"{status}>{icon}{label}</button>',
                    btnLink: '<a href="{href}" tabindex="500" title="{title}" class="{css}  btn btn-sm btn-warning"{status}>{icon}{label}</a>'
                },
                allowedFileExtensions: ["jpg", "png", "gif"],
                uploadExtraData: function() {
                    return {
                        x: document.getElementById("profile-image").getAttribute("data-x"),
                        y: document.getElementById("profile-image").getAttribute("data-y"),
                        width: document.getElementById("profile-image").getAttribute("data-width"),
                        height: document.getElementById("profile-image").getAttribute("data-height"),
                        user: document.getElementById("profile-image").getAttribute("data-user")
                    };
                }
            }).on("fileloaded", function(event, file, previewId, index, reader) {
                var image = $(".file-preview-image").cropper({
                    aspectRatio: 200 / 200,
                    crop: function(data) {
                        document.getElementById("profile-image").setAttribute("data-x", data.x);
                        document.getElementById("profile-image").setAttribute("data-y", data.y);
                        document.getElementById("profile-image").setAttribute("data-width", data.width);
                        document.getElementById("profile-image").setAttribute("data-height", data.height);
                    }
                });
            }).on("fileuploaded", function(event, data, previewId, index) {
                var url = data.response;


                if (url.length > 0) {
                    var newAvatar = "<img src='/uploads/avatar/" + url + "' alt='avatar' title='avatar'>";
                } else {
                    var newAvatar = '<svg class="icon-id-8" style="height:100%; width:100%; top:-5px; left:-15px;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>';
                }
                $("#profile-image").attr("data-img", url);
            
                $('.account a:has(img)').children('img').replaceWith(newAvatar);
                $('.account a:has(svg)').children('svg').replaceWith(newAvatar);

                $("#avatar").attr("data-old", url);
                $("#avatar").fileinput("clear").fileinput("refresh", {
                    initialPreview: ["<img src='/uploads/avatar/" + url + "' class='file-preview-image' id='avatar-img' alt='avatar' title='avatar'>"],
                    overwriteInitial: true
                }).fileinput("enable");
            });
        } else {
            //Fetch old data if not saved; Reset
            var avatar = $("#avatar").attr("data-old");
            var quote = decodeURIComponent($("#personal_quote").attr("data-old"));
            var info = decodeURIComponent($("#personal_info").attr("data-old"));
            var title = $("[name=title]").attr("data-old");
            var surname = $("[name=surname]").attr("data-old");
            var middlename = $("[name=middlename]").attr("data-old");
            var lastname = $("[name=lastname]").attr("data-old");
            var maidenname = $("[name=maidenname]").attr("data-old");
            $("#namerow").html("");
            $("#titlerow").html("");
            var gender = $("[name=gender]").attr("data-old");
            var birthday = $("#birthday-group").attr("data-old");
            var email = $("#email-group").attr("data-old");
            var phone = $("#phone-group").attr("data-old");
            var mobile = $("#mobile-group").attr("data-old");
            var website = $("#website-group").attr("data-old");
            var address = $("[name=address]").attr("data-old");
            var number = $("[name=number]").attr("data-old");
            var postalcode = $("[name=postalcode]").attr("data-old");
            var city = $("[name=city]").attr("data-old");
            var country = $("[name=country]").attr("data-old");
            var birthdayelem = '<h4><svg class="icon-cake-2"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/fonts/icons.svg#icon-cake-2"></use></svg> <span id="birthday-span">' + isUndef(birthday) + "</span></h4>";
            var emailelem = '<h4 style="white-space:pre;"><svg class="icon-phone-3"><use xlink:href="/fonts/icons.svg#icon-phone-3"></use></svg> <span id="phone-span">' + isUndef(phone) + "</span></h4>";
            var phoneelem = '<h4 style="white-space:pre;" style="white-space:pre;"><svg class="icon-mobile-phone-1"><use xlink:href="/fonts/icons.svg#icon-mobile-phone-1"></use></svg> <span id="mobile-span">' + isUndef(mobile) + "</span></h4>";
            var mobileelem = '<h4 style="white-space:pre;"><svg class="icon-mail-2"><use xlink:href="/fonts/icons.svg#icon-mail-2"></use></svg> <span id="email-span">' + isUndef(email) + "</span></h4>";
            var websiteelem = '<h4 style="white-space:pre;"><svg class="icon-globe-2"><use xlink:href="/fonts/icons.svg#icon-globe-2"></use></svg> <span id="website-span">' + isUndef(website) + "</span></h4>";
            $("#saveChanges").hide();
            $("#address-hr").hide();
            if (avatar.length > 0) {
                var previewAvatar = "<img src='/uploads/avatar/" + avatar + "' class='img-responsive img-thumbnail' alt='avatar' title='avatar'>";
            } else {
                var previewAvatar = '<svg class="icon-id-8" style="height:100%;width:100%;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/fonts/icons.svg#icon-id-8"></use></svg>';
            }
            $("#profile-image").html(previewAvatar);
            $("#profile-quote").html("<blockquote>" + quote + "</blockquote>");
            $("#profile-info").html('<h3 id="info-title" data-title="' + isUndef(title) + '" data-surname="' + isUndef(surname) + '" data-middlename="' + isUndef(middlename) + '" data-lastname="' + isUndef(lastname) + '" data-maidenname="' + isUndef(maidenname) + '">' + isUndef(title) + " " + isUndef(surname) + " " + isUndef(middlename) + " " + isUndef(lastname) + " " + isUndef(maidenname) + '</h3><div class="info-text">' + info + "</div>");
            $("#birthday-group").html(birthdayelem);
            $("#email-group").html(emailelem);
            $("#phone-group").html(phoneelem);
            $("#mobile-group").html(mobileelem);
            $("#website-group").html(websiteelem);
            $("#genderrow").hide();
            addresselem = "<legend>Address</legend>" + '<h4 id="address-group"> <span id="street-span">' + isUndef(address) + '</span> <span id="number-span">' + isUndef(number) + "</span></h4>" + '<h4 id="postalcode-group"> <span id="postalcode-span">' + isUndef(postalcode) + "</span></h4>" + '<h4 id="city-group"> <span id="city-span">' + isUndef(city) + "</span></h4>" + '<h4 id="country-group"> <span id="country-span">' + isUndef(country) + "</span></h4>";
            $("#address-row").html(addresselem);
        }
    });
});