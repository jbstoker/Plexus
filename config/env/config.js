module.exports = {
	development: {
		app: {
			name: 'Plexus Development Madness'
		},
		modules:{
			register: false,
			contact: {
						active:true,
						contact_address:'jelmer@probomail.nl'
					 }
		},
		i18n:{
            locales:['en','nl','frl'],
            directory:__dirname + "/locales/",
            defaultLocale:'en',
            cookie:'language',
            updateFiles: true,
            extension: '.js',
            },
		secret:{
			secret: 'top Secret',
			resave: false,
			saveUninitialized: false
			},
		db: 'mongodb://localhost:27017/plexus',
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
            cookie:'language',
            updateFiles: false,
            extension: '.js',
            },  		
		secret:{
			secret: 'top Secret',
			resave: false,
			saveUninitialized: false
			},
    	db: 'mongodb://localhost:27017/plexus',
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


