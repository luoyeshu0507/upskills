const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.interval(1000).take(5)

const subject = new Rx.Subject()

source$.subscribe(subject)

subject.subscribe(console.log)

setTimeout(() => {
    subject.subscribe(console.log)
}, 1200)