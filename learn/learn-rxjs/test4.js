const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(1)

source$.expand((value) => Rx.Observable.of(value * 2)).take(4).subscribe(console.log)


console.log('xx--')

const source2$ = Rx.Observable.interval(100).take(5)

const result$ = source2$.scan((sum, cur) => {
    console.log(sum, cur)
    return sum + cur
})

result$.subscribe(console.log)