function setIslandX(arr) {
  const { colLen, rowLen } = getLength(arr)
  for (let row = 0; row < rowLen; row += 1) {
    infect(arr, row, 0)
    infect(arr, row, colLen - 1)
  }
  for (let col = 1; col < colLen - 1; col += 1) {
    infect(arr, rowLen - 1, col)
    infect(arr, 0, col)
  }
  for (let row = 0; row < rowLen; row += 1) {
    for (let col = 0; col < colLen; col += 1) {
      if (arr[row][col] === 'xx') {
        arr[row][col] = 'o'
      }else if (arr[row][col] === 'o') {
        arr[row][col] = 'x'
      }
    }
  }
}

function infect(arr, row, col) {
  const originVal = getVal(arr, row, col)
  if (originVal === 'o') {
    setVal(arr, row, col, 'xx')
    infect(arr, row + 1, col)
    infect(arr, row - 1, col)
    infect(arr, row, col + 1)
    infect(arr, row, col - 1)
  }
}

function getVal(arr, row, col) {
  const { colLen, rowLen } = getLength(arr)
  if (row >= rowLen || row < 0 || col < 0 || col >= colLen) {
    return
  }
  return arr[row][col]
}

function setVal(arr, row, col, val) {
  const { colLen, rowLen } = getLength(arr)
  if (row >= rowLen || row < 0 || col < 0 || col >= colLen) {
    return
  }
  arr[row][col] = val
}

function getLength(arr = []) {
  return {
    rowLen: arr.length,
    colLen: arr[0] ? arr[0].length : 0,
  }
}

const data = [
  ['x', 'x', 'x', 'x'],
  ['x', 'o', 'o', 'x'],
  ['x', 'x', 'o', 'x'],
  ['x', 'o', 'x', 'x'],
]

setIslandX(data)

console.log(JSON.stringify(data))