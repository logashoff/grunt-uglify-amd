/*
 * grunt-uglify-amd
 * https://github.com/logashoff/grunt-uglify-amd
 *
 * Copyright (c) 2014 Alex Logashov
 * Licensed under the MIT license.
 */
'use strict';

var _ = require('lodash');
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
var nsRequireRegExp = /using\s*\(\s*["']([^'"\s]+)["']\s*\)/g;

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
  var namespaces = pathTable[file];
  if (namespaces && namespaces.length) {
    for (var i = namespaces.length, ns; i-- > 0;) {
      ns = namespaces[i];
      if(!nsTable[ns]) {
        throw new Error(
          'Required namespace "' + ns + '" not found in ' + file);
      }
      buildPaths(nsTable[ns], arr);
    }
  }
  return arr;
}

grunt.registerMultiTask('uglifyAMD', 'AMD support for UglifyJS', function() {
  if (!this.files || !this.files.length) {
    grunt.log.error('File target not specified');
    return;
  }
  var targets = this.files;
  var options = this.options();
  var matchedFiles = glob.sync(options.pattern);
  var file;
  for (var i = 0; file = matchedFiles[i]; i++) {
    var content = grunt.file.read(file);
    content.replace(nsDefineRegExp, function(match, ns) {
      //noinspection JSReferencingMutableVariableFromClosure
      nsTable[ns] = file;
    });
    var namespaces = [];
    content.replace(nsRequireRegExp, function(match, ns) {
      //noinspection JSReferencingMutableVariableFromClosure
      namespaces.push(ns);
    });
    pathTable[file] = namespaces;
  }
  grunt.loadNpmTasks('grunt-contrib-uglify');
  var libPath = path.resolve(__dirname, 'lib/namespacer.js');
  var files = {};
  libPath = path.normalize(libPath);
  _.each(targets, function(target, i) {
    var path = [];
    _.each(target.src, function(source, i) {
      var src = [];
      path.push(src);
      buildPaths(source, src);
    });
    path = _.flatten(path);
    path = _.uniq(path, false);
    path.unshift(libPath);
    files[target.dest] = path;
  });
  grunt.config.set('uglify.js.options', options);
  grunt.config.set('uglify.js.files', files);
  grunt.task.run('uglify');
});
};
