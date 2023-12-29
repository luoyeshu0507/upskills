// 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。

// 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
// 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。

// 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
// 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
// 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
// 给你一个整数数组 nums ，找出 nums 的下一个排列。

// 必须 原地 修改，只允许使用额外常数空间。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    var len = nums.length;
    // 升序排列字典序最小
    // 降序排列字典序最大
    // 从后往前找到第一个出现升序的地方
    for (var i = len - 1; i > 0; i --) {
        if (nums[i] > nums[i - 1]) {
            break;
        }
    }
    // 如果没找到 则整个数组为降序，逆序整个数组
    if (i === 0) {
        reverse(nums, 0, len - 1);
    } else {
        // 如果找到了 则把当前位置与后续比自己大的最小值交换位置，交换后，后续部分仍然是降序，把后续逆序成升序
        var l = i - 1;
        var r = i;
        var j = r + 1;
        while(j < len) {
            if (nums[j] > nums[l] && nums[j] <= nums[r]) {
                r = j;
            }
            j ++;
        }
        swap(nums, l, r);
        reverse(nums, l + 1, len - 1);
    }
    return;
};

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function reverse(arr, i, j) {
    if (i === j) return;
    var halfLen = (j - i + 1) >> 1;
    for (var k = 0; k < halfLen; k++) {
        swap(arr, i + k, j - k);
    }
}