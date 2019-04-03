/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var sortedArr = [];
    for(var i = 0, j = 0, leni = nums1.length, lenj = nums2.length; i < leni || j < lenj;) {
      var n1 = nums1[i], n2 = nums2[j];
      if (n2 === undefined || n1 <= n2) {
        i++;
        sortedArr.push(n1);
      } else {
        j++;
        sortedArr.push(n2);
      }
    }
    var arrlen = sortedArr.length;
    if (arrlen % 2) {
        return sortedArr[(arrlen - 1) / 2];
    } else {
        return (sortedArr[arrlen / 2] + sortedArr[arrlen / 2 - 1]) / 2;
    }
};

console.log(findMedianSortedArrays([1, 3, 4], [2, 4, 5, 7]));