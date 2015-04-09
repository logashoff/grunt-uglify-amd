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
var path = require('path');

module.exports = function(grunt) {
/**
 * Matches "provide" string.
 * @const {RegExp}
 */
var nsDefineRegExp = /provide\s*\(\s*["']([^'"\s]+)["']/g;
/**
 * Matches "using" string.
 * @const {RegExp}
 */
var nsRequireRegExp = /[^.]\s*using\s*\(\s*["']([^'"\s]+)["']\s*\)/g;

/**
 * Hash table maps namespace to file path.
 * @type {Object}
 */
var nsTable = {};

/**
 * Hash table maps file path to namespace.
 * @type {Object}
 */
var pathTable = {};

// Please see the Grunt documentation for more information regarding task
// creation: http://gruntjs.com/creating-tasks

/**
 * Recursively builds file paths array from specified file and assigns them to
 * array parameter. Uses pathTable to look up namespace dependencies.
 * @param {string} file File path.
 * @param {Array} arr Array to store file paths.
 * @returns {Array|null} Array of file paths.
 */
function buildPaths(file, arr) {
  if (!grunt.file.exists(file)) {
    grunt.log.warn('File "' + file + '" not found');
    return null;
  }
  arr.unshift(file);
  var amds = pathTable[file];
  if (amds && amds.length) {
    for (var i = amds.length, ns; i-- > 0;) {
      ns = amds[i];
      if(!nsTable[ns]) {
        throw new Error(
          'Required namespace "' + ns + '" not found in ' + file);
      }
      buildPaths(nsTable[ns], arr);
    }
  }
  return arr;
}

/**
 * Glob handler.
 * @param {string} error Glob error.
 * @param {Array<string>} files Array of file paths.
 */
function globHandler(error, files) {
  if (error) {
    throw new Error(error);
  }
  var file;
  for (var i = 0; file = files[i]; i++) {
    var content = grunt.file.read(file);
    content.replace(nsDefineRegExp, function(match, ns) {
      nsTable[ns] = file;
    });
    var amds = [];
    content.replace(nsRequireRegExp, function(match, ns) {
      amds.push(ns);
    });
    pathTable[file] = amds;
  }
}

grunt.registerMultiTask('uglifyAMD', 'AMD support for UglifyJS', function() {
  if (!this.files || !this.files.length) {
    grunt.log.error('File target not specified');
    return;
  }
  var deps = this.files;
  var options = this.options();
  glob(options.pattern, {sync: true}, globHandler);
  grunt.loadNpmTasks('grunt-contrib-uglify');
  var dest = deps[0].dest;
  var paths = [];
  _.each(deps, function(file) {
    _.each(file.src, function(filepath) {
      var src = [];
      buildPaths(filepath, src);
      paths.push(src);
    });
  });
  paths = _.flatten(paths);
  paths = _.uniq(paths, false);
  var libPath = path.resolve(__dirname, 'lib/namespacer.js');
  libPath = path.normalize(libPath);
  paths.unshift(libPath);
  var files = {};
  files[dest] = paths;
  grunt.config.set('uglify.js.options', options);
  grunt.config.set('uglify.js.files', files);
  grunt.task.run('uglify');
});
};
