/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
    if (numRows < 2) return s;
    const pieceCount = numRows * 2 - 2;
    const arr = new Array(numRows).fill('');
    for (let i = 0, len = s.length; i < len; i++) {
        const index = i % pieceCount;
        const row = index > numRows - 1 ? pieceCount - index : index;
        arr[row] += s[i];
    }
    return arr.join('');
};

console.log(convert('PAYPALISHIRING', 3));

// 输入：s = "PAYPALISHIRING", numRows = 3
// 输出："PAHNAPLSIIGYIR"