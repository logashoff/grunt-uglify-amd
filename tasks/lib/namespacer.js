(function(win) {

'use strict';

var nsCache = {};


/**
 * Parses exports object.
 * @param {Array} [dependencies] Dependencies array.
 * @param {Object} [exports] Module definition.
 * @return {!Object} Parsed exports object.
 * @private
 */
function parse(dependencies, exports) {
  if (typeof exports === 'function') {
    return exports.apply(win, dependencies);
  }
  return exports;
}


/**
 * Returns object associated with specified namespace.
 * Namespace must be defined using <code>provide</code>.
 * @param  {string} namespace Provided namespace.
 * @return {!Object} Object associated with a namespace.
 */
win.using = function(namespace) {
  if (!(namespace in nsCache)) {
    throw new Error('Namespace "' + namespace + '" is not defined');
  }
  return nsCache[namespace];
};


/**
 * Stores exports object using namespace key.
 * @param {string} namespace Namespace string.
 * @param {Array} [dependencies] Optional dependencies array.
 * @param {Object} exports Object to assign to namespace.
 * @return {Object} Object associated with provided namespace.
 */
win.provide = function(namespace, dependencies, exports) {
    nsCache[namespace] = parse(dependencies, exports);
    return nsCache[namespace];
};
})(window);
