/*
 * grunt-uglify-amd
 * https://github.com/logashoff/grunt-uglify-amd
 *
 * Copyright (c) 2014 Alex Logashov
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash");
var glob = require('glob');

module.exports = function(grunt) {

  var nsDefineRegExp = /[^.]\s*ns.define\s*\(\s*["']([^'"\s]+)["']\s*(\s*,\s*\S+)?\)/g;
  var nsRequireRegExp = /[^.]\s*ns.require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function buildPaths(file, arr, namespaces) {
    if (!grunt.file.exists(file)) {
      grunt.log.warn('File "' + file + '" not found');
      return;
    }

    arr.unshift(file);

    var body = grunt.file.read(file);

    var amds = [];
    body.replace(nsRequireRegExp, function(match, ns) {
      amds.push(namespaces[ns]);
    });

    if (amds && amds.length) {
      for (var i = amds.length; i-- > 0;) {
        buildPaths(amds[i], arr, namespaces);
      }
    }

    return arr;
  }

  function parseNamespace(content) {
    var namespace;
    content.replace(nsDefineRegExp, function(match, ns) {
      namespace = ns;
    });

    return namespace;
  }

  grunt.registerMultiTask('uglifyAMD', 'Create array of module dependencies from @inlude comments', function() {
    if (!this.files || !this.files.length) {
      grunt.log.error('File target not specified')
      return;
    }

    var deps = this.files;
    var options = this.options;
    var namespaces = {};

    // TODO: Need a way to define file paths
    glob('**/scripts/**/*.js', {sync:true}, function(error, files) {
      for (var i = 0, f; f = files[i]; i++) {
        var namespace = parseNamespace(grunt.file.read(f));
        if (namespace) {
          namespaces[namespace] = f;
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    var dest = deps[0].dest,
        paths = [];

    _.each(deps, function(file) {
      _.each(file.src, function(filepath) {
        var src = [];
        buildPaths(filepath, src, namespaces);
        paths.push(src);
      });
    });

    paths = _.flatten(paths);
    paths = _.uniq(paths, false);

    var out = {};
    out[dest] = paths;

    grunt.config.set('uglify.js.options', options());
    grunt.config.set('uglify.js.files', out);

    grunt.task.run('uglify');
  });
};
