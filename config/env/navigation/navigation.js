module.exports = function(i18n,req,res){

var username; 
var avatar = 'http://lorempixel.com/50/50/people';

    if(res != undefined && res.locals.loggedin === true)
    {
        username = req.user.name;
        avatar = req.user.avatar;
    }

    //Main menu top and sidebar has one sub possible
   var data =  {
                main: [{
                    liClass: "",
                    url: "/",
                    title: i18n.__('Home'),
                    icon: "",
                    smOnlyIcon: false,
                    notify: false,
                    color: "",
                    count: "",
                    children: []
                } ],
                acl: {
                    locked: [ //loggedout menu has one sub
                    {
                        liClass: "",
                        url: "/login",
                        title: i18n.__('Login'),
                        icon: "icon-lock-2",
                        children: []
                    } ],
                    open: [ //loggedin menu has one sub
                    {
                        liClass: "account",
                        url: "#",
                        title: i18n.__('Welcome') + ' ' + username,
                        avatar: avatar,
                        smOnlyIcon: false,
                        icon: "",
                        notify: false,
                        color: "",
                        count: "",
                        children: [ {
                            liClass: "",
                            url: "/user/profile",
                            title: i18n.__('Profile'),
                            smOnlyIcon: false,
                            icon: "",
                            notify: false,
                            color: "",
                            count: ""
                        }, {
                            liClass: "",
                            url: "/user/settings",
                            title: i18n.__('Settings'),
                            smOnlyIcon: false,
                            icon: "",
                            notify: false,
                            color: "",
                            count: ""
                        }, {
                            liClass: "",
                            url: "/acl/lock",
                            title: i18n.__('Lock'),
                            smOnlyIcon: false,
                            icon: "",
                            notify: false,
                            color: "",
                            count: ""
                        }, {
                            liClass: "",
                            url: "/logout",
                            title: i18n.__('Logout'),
                            smOnlyIcon: false,
                            icon: "",
                            notify: false,
                            color: "",
                            count: ""
                        } ]
                    } ]
                },
                sidebar: [ //Sidebar menu has two submenus
                {
                    liClass: "",
                    url: "/manage_users",
                    title: i18n.__('User management'),
                    smOnlyIcon: false,
                    icon: "",
                    notify: false,
                    color: "",
                    count: "",
                    children: []
                },
                {
                    liClass: "",
                    url: "/settings",
                    title: i18n.__('Global Settings'),
                    smOnlyIcon: false,
                    icon: "",
                    notify: false,
                    color: "",
                    count: "",
                    children: [] 
                }]
            };

    return data;
}