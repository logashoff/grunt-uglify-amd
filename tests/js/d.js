provide('moduleD', function() {
using('moduleE');
using('moduleF');
var D = function() {
  this.d();
};
D.prototype.d = function() {};
return D;
});
