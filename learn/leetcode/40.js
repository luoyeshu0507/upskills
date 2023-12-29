/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    var res = [];
    var pre = [];
    candidates.sort((a, b) => a - b);
    function dp(candidates, target, index, pre) {
        console.log(target, index, pre);
        var start = candidates[index];
        if (index >= candidates.length || target < start) return;
        if (target === start) {
            return res.push(pre.concat([start]));
        }
        var i = index;
        while (candidates[i] === start) {
            i ++;
        }
        var count = i - index;
        for (var i = 0; i <= count; i ++) {
            dp(candidates, target - start * i, index + count, pre);
            pre.push(start);
        }
        while (i -- > 0) {
            pre.pop();
        }
    }
    dp(candidates, target, 0, pre);
    return res;
};

combinationSum2([2,5,2,1,2], 5);
