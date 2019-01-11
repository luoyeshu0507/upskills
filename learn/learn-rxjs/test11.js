const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.interval(1000).take(5)

const subject = new Rx.Subject().debounceTime(2000);

source$.subscribe(subject)

subject.subscribe(console.log)

