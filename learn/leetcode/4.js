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

console.info(findMedianSortedArrays([1, 3, 4], [2, 4, 5, 7]));

// 找到 两个数组top totalLength / 2 的位置 再算中位数
var findMedianSortedArrays2 = function(nums1, nums2) {
  var len1 = nums1.length;
  var len2 = nums2.length;
  var totalLen = len1 + len2;
  var topK = totalLen / 2 >> 0;
  var harfK = topK / 2 >> 0;
  var pos1 = 0, pos2 = 0;
  var newPos1 = 0, newPos2 = 0;
  if (len1 === 0 && len2 === 0) return 0;
  while (topK !== 0) {
    console.log(1111, pos1, pos2, topK, harfK, newPos1, newPos2);
    if (topK === 1) {
      getArrayVal(nums1, pos1) >= getArrayVal(nums2, pos2) ? pos2++ : pos1++;
      topK = 0;
    } else if (pos1 >= len1) {
      pos2 += topK;
      topK = 0;
    } else if (pos2 >= len2) {
      pos1 += topK;
      topK = 0;
    } else {
      newPos1 = pos1 + harfK >= len1 ? len1 : pos1 + harfK;
      newPos2 = pos2 + harfK >= len2 ? len2 : pos2 + harfK;
      var v1 = getArrayVal(nums1, newPos1 - 1);
      var v2 = getArrayVal(nums2, newPos2 - 1);
      if (v1 >= v2) {
        topK -= newPos2 - pos2;
        harfK = topK / 2 >> 0;
        pos2 = newPos2;
      } else {
        topK -= newPos1 - pos1;
        harfK = topK / 2 >> 0;
        pos1 = newPos1;
      }
    }
  }
  console.log(2222, pos1, pos2);
  if (totalLen % 2 === 1) {
    return Math.min(getArrayVal(nums1, pos1), getArrayVal(nums2, pos2));
  } else {
    return (Math.min(getArrayVal(nums1, pos1, Infinity), getArrayVal(nums2, pos2, Infinity)) + Math.max(getArrayVal(nums1, pos1 - 1, - Infinity), getArrayVal(nums2, pos2 - 1, - Infinity))) / 2;
  }
}

function getArrayVal(arr, index, def) {
  const len = arr.length;
  if (index >= len) return def || Infinity;
  if (index < 0) return def || -Infinity;
  return arr[index];
}
console.log(findMedianSortedArrays2([1], [2, 3, 4]));
