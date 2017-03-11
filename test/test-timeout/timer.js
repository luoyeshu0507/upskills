var start = new Date();
setTimeout(function() {
  console.log('time55:', new Date() - start);
}, 5)
setTimeout(function() {
  console.log('time0:', new Date() - start);
}, 0)
setTimeout(function() {
  console.log('time5:', new Date() - start);
}, 5)
for (var i = 0; i < 100000; i++) {
  new Date();
}
setTimeout(function() {
  console.log('time00:', new Date() - start);
}, 0)
console.log(new Date() - start);
