// Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.

// Your algorithm's runtime complexity must be in the order of O(log n).

// If the target is not found in the array, return [-1, -1].

// For example,
// Given [5, 7, 7, 8, 8, 10] and target value 8,
// return [3, 4].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    var start, end;
    for (var i = 0, len = nums.length; i < len; i++) {
    	if (start === undefined) {
    		if (nums[i] === target) {
    			start = i;
    		}
    	}
    	if (end === undefined) {
    		if (nums[len - i - 1] === target) {
    			end = len - i - 1;
    		}
    	}
    	if (start !== undefined && end !== undefined) {
    		return [start, end];
    	}
    }
    return [-1, -1];
};
console.log(searchRange([], 8));