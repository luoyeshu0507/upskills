/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
    if (n === 1) return 1;
    if (n < 4) return 0;
    var count = 0, pre = [];
    function process(index, pre) {
        if (index >= n) return count ++;
        for (var i = 0; i < n; i ++) {
            if (isValidCeil(index, i, pre)) {
                pre.push(i);
                process(index + 1, pre);
                pre.pop();
            }
        }
    }
    process(0, pre)
    return count;
};

function isValidCeil(row, col, pre) {
    for (var i = 0; i < pre.length; i ++) {
        var c = pre[i];
        if (Math.abs(row - i) === Math.abs(col - c)) return false;
    }
    return true;
}

totalNQueens(4);