const Rx = require('rxjs/Rx');
const s = new Rx.Subject();

s.subscribe(x => console.log(x));

s.next(1);
console.log(typeof s, s);