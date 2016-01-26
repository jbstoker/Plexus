module.exports = {
	development: {
		app: {
			name: 'Plexus Development Madness'
		},
		i18n:{
            locales:['en', 'nl'],
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
		i18n:{
            locales:['en', 'nl','frl'],
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


