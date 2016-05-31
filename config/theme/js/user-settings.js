$(document).ready(function() {
    $('#AccessBox').block({
        message: $('#AccesBoxModal'),
        css: {
            backgroundColor: 'transparent',
            width: '100%',
            'margin-top': '10%',
            border: '1px',
            'z-index': '1'
        },
        overlayCSS: {
            backgroundColor: '#384b5f',
            opacity: 0.8,
            cursor: 'wait',
            'z-index': '1'
        }
    });
    $(document).on('click', '#LoginBtn', function(event) {
        event.preventDefault();
        var pass = $('#AccesBoxModal [name=password]').val();
        var email = $('#AccesBoxModal [name=email]').val();
        $.ajax({
            url: '/access-check',
            type: 'POST',
            data: {
                email: email,
                password: pass
            },
        }).done(function(data) {
            if (data.message.type == 'success') {
                $('#AccessBox').unblock();
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
    });
    //Change Login
    $(document).on('click', '#changePassBtn', function(event) {
        event.preventDefault();
        var pass1 = $('#PassWordBox [name=password1]').val();
        var pass2 = $('#PassWordBox [name=password2]').val();
        if (pass1 == "" || pass2 == "") {
            $.notify({
                title: 'Warning!',
                message: 'Password cannot be blank!'
            }, {
                type: 'warning'
            });
            form.username.focus();
            return false;
        } else {
            if (pass1 != "" && pass1 == pass2) {
                if (pass1.length < 8) {
                    $.notify({
                        title: 'Not Save!',
                        message: 'Password must contain at least eight characters!'
                    }, {
                        type: 'warning'
                    });
                    $('#PassWordBox [name=password1]').focus();
                } else {
                    var re = /[0-9]/;
                    if (!re.test(pass1)) {
                        $.notify({
                            title: 'Not Save!',
                            message: 'password must contain at least one number (0-9)!'
                        }, {
                            type: 'warning'
                        });
                        $('#PassWordBox [name=password1]').focus();
                    } else {
                        var re = /[a-z]/;
                        if (!re.test(pass1)) {
                            $.notify({
                                title: 'Not Save!',
                                message: 'password must contain at least one lowercase letter (a-z)!'
                            }, {
                                type: 'warning'
                            });
                            $('#PassWordBox [name=password1]').focus();
                        } else {
                            var re = /[A-Z]/;
                            if (!re.test(pass1)) {
                                $.notify({
                                    title: 'Not Save!',
                                    message: 'password must contain at least one uppercase letter (A-Z)!'
                                }, {
                                    type: 'warning'
                                });
                                $('#PassWordBox [name=password1]').focus();
                            } else {
                                $.ajax({
                                    url: '/user/change-password',
                                    type: 'POST',
                                    data: {
                                        password: pass1
                                    },
                                }).done(function(data) {
                                    if (data.message.type === 'success') {
                                        $('#PassWordBox .updateCheck').html('<svg style="color:green;" class="icon-check-circle-2"><use xlink:href="/fonts/icons.svg#icon-check-circle-2"></use></svg>');
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
                        }
                    }
                }
            } else {
                $.notify({
                    title: 'Warning!',
                    message: 'Please check that you\'ve entered and confirmed your password!'
                }, {
                    type: 'warning'
                });
                $('#PassWordBox [name=password1]').focus();
                return false;
            }
        }
    });
    /**
     * Change Password
     *
     */
    $(document).on('click', '#changeLoginBtn', function(event) {
        event.preventDefault();
        var login = $('#LoginNameBox #newname').val();
        $.ajax({
            url: '/user/change-login',
            type: 'POST',
            data: {
                login: login
            },
        }).done(function(data) {
            if (data.message.type === 'success') {
                $('#LoginNameBox .updateCheck').html('<svg style="color:green;" class="icon-check-circle-2"><use xlink:href="/fonts/icons.svg#icon-check-circle-2"></use></svg>');
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
    });
    /*
Change pincode
 */
    $(document).on('click', '#changePinBtn', function(event) {
        event.preventDefault();
        var pin = $('#PinCodeBox [name=pincode]').val();
        var rpin = $('#PinCodeBox [name=repeat_pincode]').val();
        if (pin == "" || rpin == "") {
            $.notify({
                title: 'Warning!',
                message: 'Pincode cannot be blank!'
            }, {
                type: 'warning'
            });
            form.username.focus();
            return false;
        } else {
            if (pin != "" && pin == rpin) {
                if (pin.length < 6) {
                    $.notify({
                        title: 'Not Save!',
                        message: 'Pincode needs to have six characters!'
                    }, {
                        type: 'warning'
                    });
                    $('#PinCodeBox [name=pincode]').focus();
                } else {
                    var re = /[a-zA-z]/;
                    if (re.test(pin)) {
                        $.notify({
                            title: 'Not Save!',
                            message: 'password must contain only numbers (0-9)!'
                        }, {
                            type: 'warning'
                        });
                        $('#PinCodeBox [name=pincode]').focus();
                    } else {
                        $.ajax({
                            url: '/user/change-pincode',
                            type: 'POST',
                            data: {
                                pincode: pin,
                                repeat_pincode: rpin
                            },
                        }).done(function(data) {
                            if (data.message.type === 'success') {
                                $('#PinCodeBox .updateCheck').html('<svg style="color:green;" class="icon-check-circle-2"><use xlink:href="/fonts/icons.svg#icon-check-circle-2"></use></svg>');
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
                }
            } else {
                $.notify({
                    title: 'Warning!',
                    message: 'Your pincodes don\'t match, try again'
                }, {
                    type: 'warning'
                });
            }
        }
    });
});