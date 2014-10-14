# grunt-uglify-amd

> This task is used to automate creation of source dependencies array for UglifyJS by specifying a namespace inside of module.

> Use ```ns.define("my.namespace")``` and ```ns.require("my.namespace")``` to define and include a module. Both functions can be used inside of comment blocks. 

>Optionally [ns library](https://github.com/logashoff/ns) can be used to assign and retrieve an object to and from a namespace using ```ns.define("foo.bar.FooBar", FooBar)``` where ```FooBar``` is a JavaScript object, then to include ```FooBar``` in a different module, do ```var FooBar = ns.require("foo.bar.FooBar")```

>**Note:** As of version 0.3.0 using ```@include path/to/my.js``` is no longer supported. Paths are identified by using namespace defined inside a file. Dependency tree is build by looking up ``ns.require`` string

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
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Specify Dependencies

```js
// Define module
// Using comments
/** ns.define("foo.bar.FooBar"); */
// Using ns library - assigns FooBar object to "foo.bar.FooBar" namespace
ns.define("foo.bar.FooBar", FooBar);
```
```js
// Require module
// In some other module
/** ns.require("foo.bar.FooBar"); */ 
// Using ns library - assigns "foo.bar.FooBar" namespace to object
var FooBar = ns.require("foo.bar.FooBar");
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
