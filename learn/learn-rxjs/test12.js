const Rx = require('rxjs/Rx')
var clicks = Rx.Observable.interval(200).take(5);
var ones = clicks.mapTo(1);
var seed = 0;
var count = ones.scan((acc, one) => {
    console.log(acc, one);
    return acc + one;
}, seed);
count.subscribe(x => console.log(x));