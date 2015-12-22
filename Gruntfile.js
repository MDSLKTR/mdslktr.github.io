/*global module: false, require: false */

module.exports = function (grunt) {
    'use strict';

    var sourcemaps = true;

    require('jit-grunt')(grunt, {
        'sass' : 'grunt-sass',
        'browserSync' : 'grunt-browser-sync'
    });

    grunt.initConfig({
        sass: {
            all: {
                options: {
                    style: 'compact', // See: http://fettblog.eu/blog/2014/04/10/gulp-sass-autoprefixer-sourcemaps/
                    sourcemap: sourcemaps
                },
                files: {
                    'assets/css/styles.css': '_dev/styles/styles.scss'
                }
            }
        },
        autoprefixer: {
            all: {
                options: {
                    browsers: [
                        'last 2 version',
                        'ie >= 9',
                        'Firefox ESR',
                        'Android >= 4.0',
                        'Safari 6.1'
                    ],
                    map: sourcemaps
                },
                src: 'assets/css/styles.css'
            }
        },
        cssmin: {
            all: {
                files: {
                    'assets/css/styles.min.css': [
                        'assets/css/styles.css'
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            dist: [
                '_dev/js/**/*.js'
            ],
            Gruntfile: [
                'Gruntfile.js'
            ]
        },
        uglify: {
            vendor: {
                options: {
                    sourceMap: false
                },
                files: {
                    'assets/js/vendor.min.js': [
                        '_vendor/promise-polyfill/Promise.min.js',
                        '_vendor/object-assign-polyfill/object-assign-polyfill.js',
                        '_vendor/react/react-with-addons.js',
                        '_vendor/react/react-dom.min.js',
                        '_vendor/gsap/src/uncompressed/easing/EasePack.js',
                        '_vendor/gsap/src/uncompressed/plugins/CSSPlugin.js',
                        '_vendor/gsap/src/uncompressed/TweenLite.js'
                    ]
                }
            },
            scripts: {
                options: {
                    sourceMap: false
                },
                files: {
                    'assets/js/scripts.min.js': [
                        '_dev/js/factories/*.js',
                        '_dev/js/collectors/*.js',
                        '_dev/js/helpers/*.js',
                        '_dev/js/partials/*.js',
                        '_dev/js/api/*.js',
                        '_dev/js/*.js'
                    ]
                }
            }
        },
        lineending: {
            options: {
                eol: 'lf',
                overwrite: true
            },
            css: {
                files: {
                    '': ['assets/css/*']
                }
            },
            js: {
                files: {
                    '': ['assets/js/*']
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'assets/css/styles.min.css',
                        'assets/js/*.js',
                        'assets/images/*.png',
                        'assets/images/*.svg',
                        'site/templates/*.php',
                        'site/snippets/*.php'
                    ]
                },
                options : {
                    proxy: 'http://localhost:1234'
                }
            }
        },
        watch: {
            // These options slow down the Grunt watcher so that it does not eat so much CPU
            options: {
                spawn: false,
                interrupt: false,
                debounceDelay: 50
            },
            sass: {
                files: [
                    '_dev/styles/partials/*.scss',
                    '_dev/styles/styles.scss'
                ],
                tasks: [
                    'css'
                ]
            },
            js: {
                files: ['_dev/js/*.js', '_dev/js/**/*.js'],
                tasks: [
                    'js'
                ]
            },
            Gruntfile: {
                files: ['Gruntfile.js'],
                tasks: [
                    'jshint:Gruntfile'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'css',
        'js'
    ]);
    grunt.registerTask('css', [
        'sass',
        'autoprefixer',
        'cssmin',
        'lineending:css'
    ]);
    grunt.registerTask('js', [
        'jshint',
        'uglify:vendor',
        'uglify:scripts',
        'lineending:js'
    ]);
    grunt.registerTask('browsersync', [
        'browserSync'
    ]);
};
