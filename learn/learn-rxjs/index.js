const Rx = require('rxjs/Rx')

var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// 在底层使用了 `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// 在底层使用了 `source.subscribe(subject)`:
multicasted.connect();

var fs = require('fs')

var exists = Rx.Observable.bindCallback(fs.exists);
exists('package.json').subscribe(exists => console.log('Does file exist?', exists));

var increase = Rx.Observable.from([1, 2, 3])
    .map(() => state => Object.assign({}, state, {count: state.count + 1}));
var state = increase.scan((state, changeFn) => changeFn(state), {count: 0});
state.subscribe(state => console.log(state))