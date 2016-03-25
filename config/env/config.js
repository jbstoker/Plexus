module.exports = {
	development: {
		app: {
			name: 'Plexus!'
		},
		modules:{
			register: true,
			contact: {
						active:true,
						contact_address:'jelmer@probomail.nl'
					 }
		},
		i18n:{
            locales:['en','nl','frl'],
            directory:__dirname + "/locales/",
            defaultLocale:'en',
            cookie:'locale',
            updateFiles: true,
            extension: '.js',
            },
		secret:{
			secret: 'top Secret',
			resave: false,
			saveUninitialized: false
			},
		db: {
			server: 'localhost:8091',
			bucket: 'default'
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
						contact_address:'jelmer@probomail.nl'
					 }
		},
		i18n:{
            locales:['en','nl','frl'],
            directory:__dirname + "/locales/",
            defaultLocale:'en',
            cookie:'locale',
            updateFiles: false,
            extension: '.js',
            },  		
		secret:{
			secret: 'top Secret',
			resave: false,
			saveUninitialized: false
			},
		db: {
			server: 'localhost:8091',
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


