/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    var matrix = new Array(n).fill('').map(function() {
        return [];
    });
    var row1 = 0, col1 = 0, row2 = n - 1, col2 = n - 1;
    var count = 1;
    // 每次打印一圈，设置左上角、右下角两个点坐标
    while (row1 < row2 && col1 < col2) {
        count = roundPrint(matrix, row1, col1, row2, col2, count);
        row1 ++;
        col1 ++;
        row2 --;
        col2 --;
    }
    // 打印最后剩下的一行或者一列
    if (row1 === row2) {
        for (var i = col1; i <= col2; i ++) {
            matrix[row1][i] = count ++;
        }
    } else if (col1 === col2) {
        for (var i = row1; i <= row2; i ++) {
            matrix[i][col1] = count ++;
        }
    }
    return matrix;
};

function roundPrint(matrix, row1, col1, row2, col2, count) {
    // 打印上边框
    for (var i = col1; i <= col2; i ++) {
        matrix[row1][i] = count ++;
    }
    // 打印右边框
    for (var i = row1 + 1; i <= row2; i ++) {
        matrix[i][col2] = count ++;
    }
    // 打印下边框
    for (var i = col2 - 1; i >= col1; i --) {
        matrix[row2][i] = count ++;
    }
    // 打印左边框
    for (var i = row2 - 1; i >= row1 + 1; i --) {
        matrix[i][col1] = count ++;
    }
    return count + 1;
}

generateMatrix(3);