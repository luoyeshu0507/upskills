function wrap(item) {
  var i = 1;
  function seti() {
    i++;
  }
  function geti1() {
    console.log('a1:' + i);
  }
  function geti2() {
    console.log('a2:' + i);
  }
  return {
    get: geti1,
    set: seti
  }
}
var a = wrap();
a.get();
a.set();
a.get();
