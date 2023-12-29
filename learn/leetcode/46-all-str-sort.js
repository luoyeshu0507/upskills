var permute = function(nums) {
    var res = [], len = nums.length;
    if (len === 1) return nums;
    function process(pre = []) {
        if (pre.length === len) return res.push([].concat(pre));
        var map = {};
        pre.forEach(item => map[item] = true);
        for (var i = 0; i < len; i ++) {
            if (!map[nums[i]]) {
                pre.push(nums[i]);
                process(pre);
                pre.pop();
            }
        }
    }
    process([]);
    return res;
};
permute([1,2,3])