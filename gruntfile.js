'use strict';
module.exports = function(grunt) {
// Project configuration.
grunt.initConfig({
  clean: {
    tests: ['tests/output/*']
  },
  uglifyAMD: {
    js: {
      options: {
        beautify: true,
        compress: false,
        mangleProperties: false,
        mangle: false,
        pattern: 'tests/js/*.js'
      },
      files: {
        'tests/output/o1.js': ['tests/js/a.js'],
        'tests/output/o2.js': ['tests/js/b.js'],
        'tests/output/o3.js': ['tests/js/c.js']
      }
    }
  },
  // Unit tests.
  nodeunit: {
    tests: ['tests/*_test.js']
  }
});
grunt.loadTasks('tasks');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-nodeunit');
grunt.registerTask('test', ['clean', 'uglifyAMD', 'nodeunit']);
};
