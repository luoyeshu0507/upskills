/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return dp(nums, 0, nums.length - 1, target);
};

function dp(arr, l, r, target) {
    if (arr.length <= 4) {
        return arr.findIndex(x => x === target);
    }
    if (l === r) return arr[l] === target ? l : - 1;
    var mid = l + ((r - l) >> 1);
    if (arr[mid] > arr[l]) {
        if (target > arr[mid] || target < arr[l]) {
            return dp(arr, mid + 1, r, target);
        } else {
            return dp(arr, l, mid - 1, target);
        }
    } else {
        if (target < arr[mid] || target > arr[r]) {
            return dp(arr, l, mid - 1, target);
        } else {
            return dp(arr, mid + 1, r, target);
        } 
    }
}

console.log(search([4,5,6,7,0,1,2], 1));