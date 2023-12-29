var jump = function(nums) {
    var len = nums.length;
    var step = 0, i = 0;
    if (len < 2) return 0;
    while (i < len) {
        var n = nums[i];
        if (i + n === len - 1) {
            step ++;
            break;
        }
        var maxIndex = i;
        for (var j = i + 1; j <= i + n; j ++) {
            if (j + nums[j] >= maxIndex + nums[maxIndex]) {
                maxIndex = j;
            }
        }
        i = maxIndex;
        step ++;
        if (i >= len - 1) break;
    }
    return step;
};

jump([9,7,9,4,8,1,6,1,5,6,2,1,7,9,0]);