(function(win) {
'use strict';

/**
 * Contains all provided namespaces.
 * @private {Object}
 */
var nsCache = {};

/**
 * Returns object associated with specified namespace.
 * Namespace must be defined using <code>provide</code>.
 * @param  {string} namespace Provided namespace.
 * @return {Object} Object associated with a namespace.
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
 * @param {Object|Function} [exports] Object to assign to namespace.
 * @return {Object} Object associated with provided namespace.
 */
win.provide = function(namespace, exports) {
  if (namespace in nsCache) {
    console.warn('"' + namespace + '" has already been provided. ' +
        'Existing exports object will be overwritten.');
  }
  if (typeof exports === 'function') {
    nsCache[namespace] = exports.call(win);
  } else {
    nsCache[namespace] = exports;
  }
  return nsCache[namespace];
};
})(window);
