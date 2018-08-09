const of = require('rxjs/observable/of')
const map = require('rxjs/operators/map')
const filter = require('rxjs/operators/filter')

const source$ = of.of(1, 2, 3)

const result$ = source$.pipe(
    filter.filter(x => x > 1),
    map.map(x => x*2)
)

result$.subscribe(console.log)

const Rx = require('rxjs/Rx')

let t = new Date()
const a$ = Rx.Observable.timer(1000).merge(Rx.Observable.timer(1000))

a$.subscribe(x => console.log(x, new Date() - t))