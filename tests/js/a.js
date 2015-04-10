provide('moduleA', ['foo', 'Bar'], function(one, two) {
using('moduleC');
return one + two;
});
