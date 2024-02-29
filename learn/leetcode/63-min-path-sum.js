var minPathSum = function(grid) {
  const { length: row, [0]: { length: col } } = grid;
  let arr = [];
  for (let i = 0; i < row; i ++) {
    for (let j = 0; j < col; j ++) {
      const val = grid[i][j];
      let preCol = j > 0 ? arr[j - 1] : Infinity;
      const preRow = i > 0 ? arr[j] : Infinity;
      if (i == 0 && j === 0) preCol = 0;
      arr[j] = val + Math.min(preCol, preRow)
    }
  }
  return arr[col - 1];
};

const grid = [[1,3,1],[1,5,1],[4,2,1]]

console.log(minPathSum(grid));