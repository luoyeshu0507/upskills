function swap(arr, i1, i2) {
  const temp = arr[i2]
  arr[i2] = arr[i1]
  arr[i1] = temp
}

function random(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}
