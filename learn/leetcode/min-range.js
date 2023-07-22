// 乱序数组 每个元素不一样大 求一个 m 长度的子序列，最大值跟最小值的差最小
function getMiniRange(arr, m) {
    var indexMap = {};
    var len = arr.length;
    // 先遍历一遍做个map key是每个元素的值 value 是它在数组 中的index
    for (var i = 0; i < arr.length; i ++) {
        indexMap[arr[i]] = i;
    }
    // 数组按大小排序
    arr.sort((a, b) => a - b);

    var res = Infinity;

    // 遍历数组 假设 i 位是组成的子列的最小值，map 存储已选择的数据的 index
    for (var i = 0; i < arr.length - (m - 1) * 2; i ++) {
        var map = {};
        // 记录已经选择的数据个数
        var count = 1;
        var j = i + 1;
        map[i] = true;
        while (count < m && j < len) {
            var item = arr[j];
            // 这个元素在原数组位置的上下两个位置的数字都没被选 说明不相邻
            if (map[indexMap[item] + 1] === undefined && map[indexMap[item] - 1] === undefined) {
                map[j] = true;
                count ++;
            }
            j ++;
        }
        // 有序数组找到 m 个之后 j - 1 位置就是最大值，i 位置是最小值
        var minus = arr[j - 1] - arr[i];
        if (count === m && minus < res) {
            res =  minus;
        }
    }
    console.log(res);
    return res;
}
getMiniRange([1,2,3,4,5], 3);