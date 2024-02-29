var uniquePathsWithObstacles = function(obstacleGrid) {
  const { length: row, [0]: { length: col } } = obstacleGrid;
  let arr = [];
  for (let i = 0; i < row; i ++) {
    for (let j = 0; j < col; j ++) {
      const val = obstacleGrid[i][j];
      if (val === 1) {
        arr[j] = 0;
      } else if (i === 0 && j === 0) {
        arr[j] = 1;
      } else {
        arr[j] = getVal(arr, j - 1) + getVal(arr, j);
      }
    }
  }
  return arr[col - 1];
};

function getVal (arr, i) {
  return arr[i] || 0;
}

const obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]];

console.log(uniquePathsWithObstacles(obstacleGrid));