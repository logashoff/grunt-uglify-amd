/*
 * grunt-uglify-amd
 * https://github.com/logashoff/grunt-uglify-amd
 *
 * Copyright (c) 2014 Alex Logashov
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash");

module.exports = function(grunt) 
{
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  
  function filePathsFromString(value)
  {
    var strArr = value.match(/\s+@include:\s+(\S+)/gmi);

    if(!strArr || !strArr.length) return [];

    for(var i = strArr.length, s, r = []; i-- > 0;)
    {
        s = strArr[i];
        
        if(s && !~r.indexOf(s))
        {
          r.push(s.match(/(\S+)$/)[0]);
        }
    }

    return r;
  }

  function buildPaths(file, arr)
  {
    if(!grunt.file.exists(file))
    {
      grunt.log.warn('File "' + file + '" not found');
      return;
    }

    arr.unshift(file);

    var body = grunt.file.read(file);
    var amds = filePathsFromString(body);

    if(amds && amds.length)
    {
      for(var i = amds.length; i-- > 0;)
      {
        buildPaths(amds[i], arr);
      }
    }

    return arr;
  }

  grunt.registerMultiTask('uglifyAMD', 'Create array of module dependencies from @inlude comments', function() 
  {
    if(!this.files || !this.files.length)
    {
      grunt.log.error("File target not specified")
      return;
    }

    grunt.loadNpmTasks('grunt-contrib-uglify');

    var options   = this.options(),
        firstFile = this.files[0],
        filePaths = [];

    buildPaths(firstFile.src[0], filePaths);

    filePaths = _.uniq(filePaths);

    var files = {};
        files[firstFile.dest] = filePaths;

    grunt.config.set("uglify.js.options", options);
    grunt.config.set("uglify.js.files", files);
    
    grunt.task.run("uglify");

  });

};
