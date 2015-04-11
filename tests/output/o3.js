(function(win) {
    "use strict";
    var nsCache = {};
    win.using = function(namespace) {
        if (!(namespace in nsCache)) {
            throw new Error('Namespace "' + namespace + '" is not defined');
        }
        return nsCache[namespace];
    };
    win.provide = function(namespace, exports) {
        if (namespace in nsCache) {
            console.warn('"' + namespace + '" has already been provided. ' + "Existing exports object will be overwritten.");
        }
        if (typeof exports === "function") {
            nsCache[namespace] = exports.call(win);
        } else {
            nsCache[namespace] = exports;
        }
        return nsCache[namespace];
    };
})(window);

provide("moduleE", {});

provide("moduleF", function() {
    return 1 + 2 + 3 + 4;
});

provide("moduleD", function() {
    using("moduleE");
    using("moduleF");
    var D = function() {
        this.d();
    };
    D.prototype.d = function() {};
    return D;
});

provide("moduleC", function() {
    using("moduleD");
});