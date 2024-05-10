function swap(arr, i1, i2) {
  const temp = arr[i2]
  arr[i2] = arr[i1]
  arr[i1] = temp
}

function random(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

function sort(arr, L = 0, R = arr.length - 1) {
  if (L >= R) return
  const randomIndex = random(L, R)
  const base = arr[randomIndex]
  swap(arr, R, randomIndex)
  let i = L, j = R
  while (i < j) {
    while (i < j && arr[i] <= base) {
      i ++
    }
    arr[j] = arr[i]
    while (i < j && arr[j] >= base) {
      j --
    }
    arr[i] = arr[j]
  }
  arr[i] = base
  sort(arr, L, i - 1)
  sort(arr, i + 1, R)
}

const arr = []
for (let i = 0; i < 20; i ++) {
  arr[i] = Math.random()
}

const arr2 = [...arr]
sort(arr2)

console.log(arr.sort((a, b) => a - b).toString() === arr2.toString())