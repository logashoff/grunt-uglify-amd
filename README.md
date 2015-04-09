# grunt-uglify-amd
> This task is used to automate creation of source dependencies array for UglifyJS by specifying a namespace inside of module itself.

> Use ```provide('mynamespace', [dependency1], function(dep1))``` or ```provide('mynamespace', null, {foo:bar})``` to define a namespace.

> Use ```var myObj = using("mynamespace")``` to import an object associated with namespace. 

>**Warning:** This task does not resolve circular dependencies. Cases where ```A->B->A``` will result in stack overflow error. 

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-uglify-amd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-uglify-amd');
```

## The "uglifyAMD" task

### Overview
In your project's Gruntfile, add a section named `uglifyAMD` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  uglifyAMD: {
   // Task-specific options go here.
    options: {
      sourceMap: true,
      sourceMapIncludeSources: true,
      compress: {},
      beautify: false,
      pattern: 'js/*.js'
    },
    // Target-specific file lists and/or options go here.
    files: {
       // foo.js will be added to the array of sources by the task since
       // bar.js requires it as dependency
      'js/compiled.js': ['js/bar.js] 
    }
  },
});
```

### Specify Dependencies

> foo.js
```js
provide('foo', [window, document, whatever...], function(win, doc, whatever...) {
  // code...
  return whatever...;
})
```
> bar.js
```js
var myFoo = using('foo');
// code...
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
