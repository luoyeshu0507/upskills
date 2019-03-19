const Rx = require('rxjs/Rx');

const origin$ = Rx.Observable.timer(1000).map(x => x + '--').startWith('abc').shareReplay(1);

const source1$ = Rx.Observable.timer(0, 500);

const result$ = source1$.withLatestFrom(origin$);

result$.subscribe(
    console.log,
    null,
    () => console.log('complete')
)

