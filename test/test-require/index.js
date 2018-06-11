var a = true;
if (a) {
  console.log('begin require m1');
  var m = require('./m1');
  console.log('after require m1');
} else {
  console.log('begin require m2');
  var m = require('./m2');
  console.log('after require m2');
}
m();