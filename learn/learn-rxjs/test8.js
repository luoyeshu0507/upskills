const Rx = require('rxjs/Rx')

const data$ = new Rx.Observable.ajax.get('http://localhost:8083/').startWith([]).shareReplay(1);

data$.subscribe(function (x) {
    console.log(x)
})
// console.log(data$.getValue())

