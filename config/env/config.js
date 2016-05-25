module.exports = {
	development: {
		app: {
			name: 'Plexus!'
		},
		modules:{
			register: true,
			contact: {
						active:true,
						contact_address:'jelmerstoker@gmail.com'
					 }
		},
		i18n:{
            locales:['be','de','gb','fr','frl','nl','us'],
            directory:__dirname + "/locales/",
            defaultLocale:'gb',
            cookie:'locale',
            updateFiles: true,
            extension: '.js',
            },
		secret:{
			secret: 'top Secret',
			resave: true,
			saveUninitialized: false,
  			cookie: { secure: false }
			},
		db: {
			server: 'couchbase://127.0.0.1',
			bucket: 'default'
		},
		email:{
			service:'',
			address:'jelmerstoker@gmail.com',
			smtp:{ 	   
					host: 'localhost',
					port: 25,
				 },
			auth:{
			   		user: 'jelmerstoker@gmail.com',
			   		pass: ''
				}
		},
		facebook: {
			clientID: "{{PLACEHOLDER}}",
			clientSecret: "{{PLACEHOLDER}}",
			callbackURL: "{{PLACEHOLDER}}"
		},
		google: {
			clientID: "{{PLACEHOLDER}}",
			clientSecret: "{{PLACEHOLDER}}",
			callbackURL: "{{PLACEHOLDER}}"
		}
	},
  	production: {
		app: {
			name: 'Plexus! Create, Read and Compose'
		},
		modules:{
			register: true,
			contact: {
						active:true,
						contact_address:'jelmerstoker@gmail.com'
					 }
		},
		i18n:{
            locales:['be','de','gb','fr','frl','nl','us'],
            directory:__dirname + "/locales/",
            defaultLocale:'gb',
            cookie:'locale',
            updateFiles: false,
            extension: '.js',
            },  		
		secret:{
			secret: 'top Secret',
			resave: true,
			saveUninitialized: false,
			cookie: { secure: false}
			},
		db: {
			server: 'couchbase://127.0.0.1',
			bucket: 'default'
		},
		facebook: {
			clientID: "",
			clientSecret: "",
			callbackURL: ""
		},
		google: {
			clientID: '',
			clientSecret: '',
			callbackURL: ''
		}
 	}
}


