# grunt-uglify-amd

> Use ns.define and ns.require to define and include a module

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
ns.define("foo.bar.FooBar");
// or
ns.define("foo.bar.FooBar", FooBar);

// Require module
ns.require("foo.bar.FooBar");
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
