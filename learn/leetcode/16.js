/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort();
    var len = nums.length;
    var res = Infinity;
    for (var i = 0; i < len; i++) {
        if (nums[i] !== nums[i - 1]) {
            var j = i + 1, k = len - 1;          
            while (j < k) {
                var vi = nums[i], vj = nums[j], vk = nums[k];
                var sum = vi + vj + vk;
                if (sum === target) return sum;
                if (Math.abs(sum - target) < Math.abs(res - target)) {
                    res = sum;
                }
                if (sum > target) {
                    k --;
                } else {
                    j ++;
                }     
            }
        }
    }
    return res;
};

let a = threeSumClosest([-826,-342,599,-726,960,-235,436,-91,-511,-793,-658,-143,-524,-609,-728,-734,273,-19,-10,630,-294,-453,149,-581,-405,984,154,-968,623,-631,384,-825,308,779,-7,617,221,394,151,-282,472,332,-5,-509,611,-116,113,672,-497,-182,307,-592,925,766,-62,237,-8,789,318,-314,-792,-632,-781,375,939,-304,-149,544,-742,663,484,802,616,501,-269,-458,-763,-950,-390,-816,683,-219,381,478,-129,602,-931,128,502,508,-565,-243,-695,-943,-987,-692,346,-13,-225,-740,-441,-112,658,855,-531,542,839,795,-664,404,-844,-164,-709,167,953,-941,-848,211,-852,-665,-897,-627,123,-177,-35,-519,-241,-711,-74,420,-2,-101,715,708,256,-307,466,-602,-636,990,857,70,590,-4,610,-522,597,-667,-882,524,181,-854,275,-600,453,-942,134], -2805);
console.log(a);
