const Rx = require('rxjs/Rx');
const s = new Rx.Subject();

s.subscribe(x => console.log(x, x === a));
let a = {};
s.next(a);
s.next(a);
s.next(a);
