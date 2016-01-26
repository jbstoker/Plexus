module.exports = { 
	//Main menu top and sidebar has one sub possible
	main:[{ 
				liClass:'', 
				url: "/", 
				title: "Home", 
				icon:'',
				smOnlyIcon:false,
				notify:false,
				color:'', 
				count:'', 
				children:[]
			},
			{ 
				liClass:'', 
				url: "#", 
				title: "Demo Pages", 
				icon:'',
				smOnlyIcon:false,
				notify:false,
				color:'',
				count:'',
				children:[ //Dropdown
							{ liClass:'', url: "/components", title: "Components", icon:'',smOnlyIcon:false,notify:false,color:'', count:''},
							{ liClass:'', url: "/icons", title: "Icons", icon:'',smOnlyIcon:false,notify:false,color:'', count:''}
						]
			},
			{ 	liClass:'', 
				url:"/faq", 
				title: "FAQ", 
				smOnlyIcon:false,
				icon:'',
				notify:false,
				color:'', 
				count:'',
				children:[]
			}
		 ],
	acl:{ locked:[//loggedout menu has one sub
		 		  		{ liClass:'', url:"/login", title: "Login/Register", icon:'icon-lock-2', children:[]}
		 		 ],
		 	open:[//loggedin menu has one sub
  	         		{ 
  	         			liClass:'account',
     					url:"#",
     					title: "Welkom Jelmer",
     					smOnlyIcon:false,
     					icon:'',
     					notify:false,
     					color:'',
     					count:'',
     					children:[
  	         						{ liClass:'', url: "/user/profile", title: "Profile", smOnlyIcon:false,icon:'',notify:false,color:'', count:''},
  	         						{ liClass:'', url: "/user/settings", title: "Settings", smOnlyIcon:false,icon:'',notify:false,color:'', count:''},
  		   	  						{ liClass:'', url: "/user/lock", title: "Lock", smOnlyIcon:false,icon:'',notify:false,color:'', count:''},
  		      						{ liClass:'', url: "/logout", title: "Logout", smOnlyIcon:false,icon:'',notify:false,color:'', count:''}
  	         					]
  	         		}
		 		 ]
		},	  
  	sidebar:[//Sidebar menu has two submenus
  	         	{ liClass:'', url:"/manage_users", title: "User management", smOnlyIcon:false,icon:'',notify:false,color:'', count:'', children:[]}
  		  	]
}
