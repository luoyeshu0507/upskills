Function.prototype.bind2 = function () {
  var context = arguments[0];
  var that = this;
  var params = Array.prototype.slice.call(arguments).slice(1);
  return function () {
    that.apply(context, params.concat(Array.prototype.slice.call(arguments)));
  }
}

var obj1 = {a: 1};
var obj2 = {a: 2};

function a() {
  console.log(this, arguments);
}

a.bind2(obj2, 1, 2, 3)(4);

