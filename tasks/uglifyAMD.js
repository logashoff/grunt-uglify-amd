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

/**
 * @example {"namespace":"path/js/file"}
 * @type {Object}
 */
var nsTable = {};

/**
 * @example {"path/js/file":["namespace"]}
 * @type {Object}
 */
var pathTable = {};

// Please see the Grunt documentation for more information regarding task
// creation: http://gruntjs.com/creating-tasks

function buildPaths(file, arr) {
  if (!grunt.file.exists(file)) {
    grunt.log.warn('File "' + file + '" not found');
    return;
  }

  arr.unshift(file);

  var amds = pathTable[file];
  if (amds && amds.length) {
    for (var i = amds.length, ns; i-- > 0;) {
      ns = amds[i];
      if(!nsTable[ns]) {
        throw new Error('Required namespace "' + ns + '" not found.');
      }

      buildPaths(nsTable[ns], arr);
    }
  }

  return arr;
}

grunt.registerMultiTask('uglifyAMD', 'UglifyJS AMD', function() {
  if (!this.files || !this.files.length) {
    grunt.log.error('File target not specified')
    return;
  }

  var deps = this.files;
  var options = this.options();

  glob(options.pattern, {sync:true}, function(error, files) {
    var i = 0,
        amds,
        content,
        file;
    for (; file = files[i]; i++) {
      content = grunt.file.read(file);
      content.replace(nsDefineRegExp, function(match, ns) {
        nsTable[ns] = file;
      });

      amds = [];
      content.replace(nsRequireRegExp, function(match, ns) {
        amds.push(ns);
      });

      pathTable[file] = amds;
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  var dest = deps[0].dest,
      paths = [];

  _.each(deps, function(file) {
    _.each(file.src, function(filepath) {
      var src = [];
      buildPaths(filepath, src);
      paths.push(src);
    });
  });

  paths = _.flatten(paths);
  paths = _.uniq(paths, false);

  var files = {};
  files[dest] = paths;

  grunt.config.set('uglify.js.options', options);
  grunt.config.set('uglify.js.files', files);

  grunt.task.run('uglify');
});
};
