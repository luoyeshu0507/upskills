/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) return '1';
    return readStr(countAndSay(n - 1));
};

function readStr(str) {
    var len = str.length;
    var char = str[0];
    var count = 0;
    var i = 0;
    var res = '';
    while (i < len) {
        if (str[i] === char) {
            count ++;
            i ++;
        } else {
            res += count + char;
            count = 0;
            char = str[i];
        }
    }
    res += count + char;
    return res;
}

countAndSay(4);