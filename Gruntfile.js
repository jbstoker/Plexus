module.exports = function(grunt) {

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
        less: {
            development: {
                options: {
                    compress: true,  //minifying the result
                },
                files: {
                    //compiling frontend.less into frontend.css
                    "./public/stylesheets/frontend.css":"./config/dev-css/frontend.less",
                    "./public/stylesheets/backend.css":"./config/dev-css/backend.less"
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            js_frontend: {
                src: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './bower_components/summernote/dist/summernote.js',
                    './bower_components/datatables/media/js/jquery.dataTables.js',
                    './bower_components/datatables/media/js/dataTables.bootstrap.js',
                    
                    './config/TrendyBootstrapTheme/assets/js/start.js',
                    './config/dev-js/dev.js'
                ],
                dest: './public/javascript/frontend.js'
            },
            js_backend: {
                src: [
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './bower_components/summernote/dist/summernote.js'
                ],
                dest: './public/javascript/backend.js'
            }
        },
        uglify: {
            options: {
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            frontend: {
                files: {
                    './public/javascript/frontend.js': './public/javascript/frontend.js',
                }
            },
            backend: {
                files: {
                    './public/javascript/backend.js': './public/javascript/backend.js',
                }
            },
        },
        copy: {
                  main: {
                    files: [
                            {expand: true,flatten: true, src: ['./config/bootstrap-theme/TrendyBootstrapTheme/assets/img/*'], dest: './public/images/', filter: 'isFile'},
                            {expand: true,flatten: true, src: ['./config/bootstrap-theme/TrendyBootstrapTheme/assets/img/comments/*'], dest: './public/images/comments/', filter: 'isFile'},
                            {expand: true,flatten: true, src: ['./config/bootstrap-theme/TrendyBootstrapTheme/assets/fonts/*'], dest: './public/fonts/', filter: 'isFile'},
                            {expand: true,flatten: true, src: ['./bower_components/font-awesome/fonts/*'], dest: './public/fonts/', filter: 'isFile'},
                            ],
                        },
                },
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Task definition
    grunt.registerTask('default', ['concat','less','uglify','copy']);

};
