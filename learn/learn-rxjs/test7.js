const Rx = require('rxjs/Rx')

const subject = new Rx.BehaviorSubject()

subject.subscribe(console.log);

var obj = {a: 1};

subject.next(obj);

console.log(subject.getValue() === obj)