const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.interval(200).take(2);
const project = (value, index) => {
    return Rx.Observable.interval(100).take(10);
}

const result$ = source$.switchMap(project);

result$.subscribe(console.log);