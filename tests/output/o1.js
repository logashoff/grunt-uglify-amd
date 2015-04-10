(function(win) {
    "use strict";
    var nsCache = {};
    function parse(dependencies, exports) {
        if (typeof exports === "function") {
            return exports.apply(win, dependencies);
        }
        return exports || null;
    }
    win.using = function(namespace) {
        if (!(namespace in nsCache)) {
            throw new Error('Namespace "' + namespace + '" is not defined');
        }
        return nsCache[namespace];
    };
    win.provide = function(namespace, dependencies, exports) {
        nsCache[namespace] = parse(dependencies, exports);
        return nsCache[namespace];
    };
})(window);

provide("moduleE", [], {});

provide("moduleF", [ 1, 2, 3, 4 ], function(one, two, three, four) {
    return one + two + three + four;
});

provide("moduleD");

using("moduleE");

using("moduleF");

provide("moduleC");

using("moduleD");

provide("moduleA", [ "foo", "Bar" ], function(one, two) {
    using("moduleC");
    return one + two;
});