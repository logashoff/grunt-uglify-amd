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
    var output1 = grunt.file.read('tests/output/o1.js');
    test.ok(contains(output1, 'win.using') &&
      contains(output1, 'win.provide'), 'Contains library');
    test.ok(contains(output1, 'moduleA'), 'Contains "moduleA"');
    test.ok(contains(output1, 'moduleE'), 'Contains "moduleE"');
    test.ok(contains(output1, 'moduleF'), 'Contains "moduleF"');
    test.done();
  },
  testOutput2: function(test) {
    var output2 = grunt.file.read('tests/output/o2.js');
    test.ok(contains(output2, 'win.using') &&
      contains(output2, 'win.provide'), 'Contains library');
    test.ok(contains(output2, 'moduleA'), 'Contains "moduleA"');
    test.ok(contains(output2, 'moduleE'), 'Contains "moduleE"');
    test.ok(contains(output2, 'moduleC'), 'Contains "moduleC"');
    test.done();
  }
};