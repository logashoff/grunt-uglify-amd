/*
 * grunt-uglify-amd
 * https://github.com/logashoff/grunt-uglify-amd
 *
 * Copyright (c) 2014 Alex Logashov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglifyAMD: {
      js: {
        options: {
            sourceMap: true,
            sourceMapIncludeSources: true,
            compress: true,
            beautify: false
          },
        files: {
          "scripts/bin/app.js": ["scripts/src/main.js"]
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['uglifyAMD']);

};
