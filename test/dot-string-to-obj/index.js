var a = 'a.b.c.e.f';
var arr = a.split('.');
var len = arr.length;
var res = arr.join('": {"') + '": {}' + new Array(len).fill('}').join('');
console.log(res);
