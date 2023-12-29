function debounce(fn, time) {
    let t = 0;
    return function(...rest) {
        clearTimeout(t);
        t = setTimeout(function() {
            fn.apply(null, rest);
        }, time);
    }
}