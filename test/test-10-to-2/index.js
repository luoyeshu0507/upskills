function convent10to2(num) {
    var res = '';
    var numArr = num.toString().split('.');
    res += Number(numArr[0]).toString(2);
    if (numArr[1]) {
        res += '.';
        var rest = Number(0 + '.' + numArr[1]);
        var count = 1;
        while (res.length < 30) {
            var v = Math.pow(0.5, count);
            if (rest > v) {
                res += '1';
                rest -= v;
            } else {
                res += '0';
            }
            count ++;
        }
    }
    console.log(res);
}

convent10to2(0.4342343);