module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n'
            },
            dist:{
                src: [
                    'script/src/enum.js',
                    'script/src/eventBus.js',
                    'script/src/audio.js',
                    'script/src/lib/*.js',
                    'script/src/*.js',
                    'script/src/ui/main.js',
                    'script/src/ui/**/*.js',
                    'script/src/**/*.js'
                ],
                dest: 'script/bassoontracker.js'
            }
        },
        uglify: {
            options: {
                mangle: {
                    toplevel:false
                },
                mangleProperties: false,
                exceptionsFiles: [ 'GruntMangleExceptions.json'],
                nameCache: 'grunt-uglify-cache.json',
                banner: '/*<%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %> - ' + 'build <%= grunt.template.today("yyyy-mm-dd") %> - Full source on <%= pkg.repository %> */',
                compress: {
                    sequences     : true,  // join consecutive statemets with the “comma operator”
                    properties    : true,  // optimize property access: a["foo"] → a.foo
                    dead_code     : true,  // discard unreachable code
                    drop_console  : true,
                    drop_debugger : true,  // discard “debugger” statements
                    unsafe        : false, // some unsafe optimizations (see below)
                    conditionals  : true,  // optimize if-s and conditional expressions
                    comparisons   : true,  // optimize comparisons
                    evaluate      : true,  // evaluate constant expressions
                    booleans      : true,  // optimize boolean expressions
                    loops         : true,  // optimize loops
                    unused        : true,  // drop unused variables/functions
                    hoist_funs    : true,  // hoist function declarations
                    hoist_vars    : false, // hoist variable declarations
                    if_return     : true,  // optimize if-s followed by return/continue
                    join_vars     : true,  // join var declarations
                    cascade       : true,  // try to cascade `right` into `left` in sequences
                    side_effects  : true,  // drop side-effect-free statements
                    warnings      : true,  // warn about potentially dangerous optimizations/code
                    global_defs   : {},
                    pure_getters  : true
                },
                beautify: false
            },
            dist:{
                files: {
                    'script/bassoontracker-min.js': ['script/bassoontracker.js']
                }
            }

        },
        clean: {
            js: ['script/bassoontracker.js']
        },
        replace: {
            buildnumber: {
                src: ['index_src.html'],
                dest: 'index.html',
                replacements: [{
                    from: '{build}',
                    to: function (matchedWord) {
                        function pad(v){return v<10?"0"+v:v;}
                        var pkg =  grunt.file.readJSON('package.json');
                        return pkg.version + "-build" + grunt.template.today("yyyymmdd.hhMM");
                    }
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');

    // Default task(s).
    // note:  use concat before uglify to keep the order of the JS files
    grunt.registerTask('bassoontracker', ['replace','concat','uglify','clean']);
    grunt.registerTask('default', ['bassoontracker']);

};