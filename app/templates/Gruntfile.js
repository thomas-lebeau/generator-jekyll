// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        jekyll: 'jkl'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            recess: {
                files: ['<%%= yeoman.app %>/assets/styles/{,*/}*.less'],
                tasks: ['recess']
            },
            livereload: {
                files: [
                    '<%%= yeoman.app %>/_posts/*.md',
                    '<%%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%%= yeoman.app %>}/assets/styles/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/assets/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['jekyll', 'livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'jkl')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/assets/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/assets/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (testFramework === 'mocha') { %>
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                /*src: '',*/
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %>
        recess: {
            dist: {
                options: {
                    compile: true
                },
                files: {
                    '<%%= yeoman.app %>/assets/styles/main.css': ['<%%= yeoman.app %>/assets/styles/main.less']
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        jekyll: {
            dist: {
                src: '<%%= yeoman.app %>',
                dest: '<%%= yeoman.jekyll %>',
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.jekyll %>/assets/scripts/{,*/}*.js',
                        '<%%= yeoman.jekyll %>/assets/styles/{,*/}*.css',
                        '<%%= yeoman.jekyll %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.jekyll %>/assets/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%%= yeoman.jekyll %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/assets/styles/{,*/}*.css'],
            options: {
                dirs: ['<%%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.jekyll %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/assets/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.jekyll %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.dist %>/assets/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/assets/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%%= yeoman.jekyll %>/assets/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.jekyll %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.jekyll %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'assets/images/{,*/}*.{webp,gif}',
                        'assets/fonts/*'
                    ]
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,<% if (fontawesome) { %>
                    cwd: '<%%= yeoman.app %>/bower_components/font-awesome/build/assets/font-awesome/font/',
                    dest: '<%%= yeoman.app %>/assets/fonts/',
                    src: ['*']<% } else if (bootstrap) { %>
                    cwd: '<%%= yeoman.app %>/bower_components/bootstrap/img/',
                    dest: '<%%= yeoman.app %>/assets/images/',
                    src: ['*']<% } %>
                }]
            }
        },
        concurrent: {
            dist: [
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'recess',
            'copy:server',
            'jekyll',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'recess',
        'copy:server',
        'jekyll',
        'connect:test',<% if (testFramework === 'mocha') { %>
        'mocha'<% } else if (testFramework === 'jasmine') { %>
        'jasmine'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'recess',
        'copy:server',
        'jekyll',
        'useminPrepare',
        'concurrent',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
