const Rx = require('rxjs/Rx');

const origin$ = Rx.Observable.timer(0, 1000);

const source1$ = origin$.map(x => x + 'a');
const source2$ = origin$.map(x => x + 'b');

const result$ = source1$.withLatestFrom(source2$);

result$.subscribe(
    console.log,
    null,
    () => console.log('complete')
)