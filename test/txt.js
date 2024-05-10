function sort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return
  const mid = left + Math.floor((right - left) / 2)
  const randomKey = random(left, right)
  let base = arr[randomKey]
  swap(arr, right, randomKey)
  let i = left, j = right
  while (i < j) {
    while (arr[i] <= base & i < j) {
      i ++
    }
    arr[j] = arr[i]
    while (arr[j] >= base && i < j) {
      j --
    }
    arr[i] = arr[j]
  }
  arr[i] = base
  sort(arr, left, i - 1)
  sort(arr, i + 1, right)
}

function swap(arr, index1, index2) {
  const v1 = arr[index1]
  arr[index1] = arr[index2]
  arr[index2] = v1
}

function random(start, end) {
  return start + Math.floor((end - start + 1) * Math.random())
}


const arr = new Array(10).fill(1).map(() => Math.random())
const arrCopy = [...arr]
arr.sort((a, b) => a - b)

sort(arrCopy)

console.log(arr.toString() === arrCopy.toString())
console.log(arr)
console.log(arrCopy)