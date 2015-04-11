'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit
 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

function contains(str, value) {
  return str.indexOf(value) > -1;
}

module.exports = {
  testOutput1: function(test) {
    var out = grunt.file.read('tests/output/o1.js');
    test.ok(contains(out, 'win.using') &&
      contains(out, 'win.provide'), 'Contains library');
    test.ok(contains(out, 'moduleA'), 'Contains "moduleA"');
    test.ok(contains(out, 'moduleE'), 'Contains "moduleE"');
    test.ok(contains(out, 'moduleF'), 'Contains "moduleF"');
    test.done();
  },
  testOutput2: function(test) {
    var out = grunt.file.read('tests/output/o2.js');
    test.ok(contains(out, 'win.using') &&
      contains(out, 'win.provide'), 'Contains library');
    test.ok(contains(out, 'moduleA'), 'Contains "moduleA"');
    test.ok(contains(out, 'moduleE'), 'Contains "moduleE"');
    test.ok(contains(out, 'moduleC'), 'Contains "moduleC"');
    test.done();
  },
  testOutput3: function(test) {
    var out = grunt.file.read('tests/output/o3.js');
    test.ok(contains(out, 'win.using') &&
    contains(out, 'win.provide'), 'Contains library');
    test.ok(contains(out, 'provide("moduleD"'), 'Contains "moduleD"');
    test.ok(contains(out, 'provide("moduleE"'), 'Contains "moduleE"');
    test.ok(contains(out, 'provide("moduleF"'), 'Contains "moduleF"');
    test.done();
  }
};