/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var sum = 0;
    var l = 0, r = height.length - 1, lmax = height[l], rmax = height[r];
    while (l < r) {
        if (lmax < rmax) {
            l ++;
            lmax = Math.max(height[l], lmax);
            sum += Math.max(0, lmax - height[l]);
        } else {
            r --;
            rmax = Math.max(height[r], rmax);
            sum += Math.max(0, rmax - height[r]);
        }
    }
    return sum;
};
trap([0,1,0,2, 1,0,1 ,3,2,1,2,1]);
