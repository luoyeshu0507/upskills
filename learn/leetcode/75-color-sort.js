function colorSort(arr) {
  let len = arr.length, L = -1, R = len, i = 0
  while (i < R) {
    const cur = arr[i]
    if (cur === 0) {
      swap(arr, L + 1, i)
      L ++
    } else if (cur === 2) {
      swap(arr, i, R - 1)
      R --
    }
    i ++
  }
}

function swap(arr, i1, i2) {
  const temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
}
const arr = [0,0,0,1,2,2,1,0,0,1,2,2,0,1]
colorSort(arr)
console.log(arr)