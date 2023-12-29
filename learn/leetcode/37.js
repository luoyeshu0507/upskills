/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    var map = genMap(board);
    dps(board, map);
    return board;
};

function genMap(board) {
    var col = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        row = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        block = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        empty = [];
    var map = {
        col,
        row,
        block,
        empty,
    };
    for (var i = 0; i < 9; i ++) {
        for (var j = 0; j < 9; j ++) {
            var val = board[i][j];
            if (board[i][j] !== '.') {
                setMap(map, i, j, val, 'add');
            } else {
                empty.push([i, j]);
            }
        }
    }
    return {
        col,
        row,
        block,
        empty,
    }
}

function setMap(map, i, j, num, type) {
    var {row, col, block} = map;
    num = 1 << Number(num);
    if (type === 'add') {
        if (row[i] & num || col[j] & num || block[Math.floor(i / 3) * 3 + Math.floor(j / 3)] & num) return false;
        row[i] |= num;
        col[j]|= num;
        block[Math.floor(i / 3) * 3 + Math.floor(j / 3)] |= num;
    } else {
        row[i] &= ~ num;
        col[j]&= ~ num;
        block[Math.floor(i / 3) * 3 + Math.floor(j / 3)] &= ~ num;
    }
    return true;
}

function dps(board, map) {
    var empty = map.empty || [];
    if (empty.length === 0) return true;
    var [i, j] = empty.pop();
    for (var k = 1; k <= 9; k ++) {
        if (setMap(map, i, j, k, 'add')) {
            board[i][j] = k + '';
            if (dps(board, map)) {
                return true;
            } else {
                setMap(map, i, j, k, 'remove');
            } 
        }
    }
    empty.push([i, j]);
    return false;
}

solveSudoku([
    ["5","3",".", ".","7",".", ".",".","."],
    ["6",".",".", "1","9","5", ".",".","."],
    [".","9","8", ".",".",".", ".","6","."],
    ["8",".",".", ".","6",".", ".",".","3"],
    ["4",".",".", "8",".","3", ".",".","1"],
    ["7",".",".", ".","2",".", ".",".","6"],
    [".","6",".", ".",".",".", "2","8","."],
    [".",".",".", "4","1","9", ".",".","5"],
    [".",".",".", ".","8",".", ".","7","9"]
]);

// [
//     ["5","3","4", "6","7","8", "9","1","2"],
//     ["6","7","2", "1","9","5", "3","4","8"],
//     ["1","9","8", "3","4","2", "5","6","7"],
//     ["8","5","9", "7","6","1", "4","2","3"],
//     ["4","2","6", "8","5","3", "7","9","1"],
//     ["7","1","3", "9","2","4", "8","5","6"],
//     ["9","6","1", "5","3","7", "2","8","4"],
//     ["2","8","7", "4","1","9", "6","3","5"],
//     ["3","4","5", "2","8","6", "1","7","9"]
// ]