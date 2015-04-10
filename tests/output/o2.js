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

provide("moduleC");

using("moduleD");

provide("moduleA", function() {
    using("moduleC");
    return 1 + 2;
});

using("moduleA");