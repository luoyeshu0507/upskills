var searchRange = function(nums, target) {
    var len = nums.length;
    if (nums[len - 1] < target || nums[0] > nums) {
        return [-1, -1];
    }
    return [findIndex(nums, target, 0, len - 1, 'left'), findIndex(nums, target, 0, len - 1, 'right')];
};

function findIndex(arr, target, l = 0, r = arr.length - 1, side) {
    if (l >= r) {
        return arr[l] === target ? l : -1;
    }
    var mid = l + ((r - l) >> 1);
    var val = arr[mid];
    if (val > target) {
        return findIndex(arr, target, l, mid - 1, side);
    } else if (val < target) {
        return findIndex(arr, target, mid + 1, r, side);
    } else if (side === 'left') {
        return findIndex(arr, target, l, mid, side);
    } else if (side === 'right') {
        return findIndex(arr, target, mid, r, side);
    }
}

console.log(searchRange([5,7,7,8,8,10], 8));