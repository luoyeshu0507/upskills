/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    var map = [1, 1];
    var list = [1];
    for (var i = 2; i <= n; i ++) {
        map[i] = map[i - 1] * i;
        list[i - 1] = i;
    }
    function process(preStr, list, k) {
        if (k < 2) return preStr + list.join('');
        var nextList = [], len = list.length;
        var flag = false, stepCount = map[len - 1];
        for (var i = 0; i < len; i ++) {
            if (stepCount >= k && !flag) {
                flag = true;
                preStr += list[i];
            } else {
                if (!flag) {
                    k -= stepCount;
                }
                nextList.push(list[i]);
            }
        }
        return process(preStr, nextList, k);
    }
    return process('', list, k)
};

getPermutation(3, 5);