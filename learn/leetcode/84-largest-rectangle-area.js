function largestRectangleArea(heights) {
  const len = heights.length
  let largest = len
  let heightMap = {}
  for (let i = 0; i < len; i ++) {
    const height = heights[i]
    if (!heightMap[height]) {
      let max = height
      let sum = 0
      for (let j = 0; j < len; j ++) {
        const h = heights[j]
        if (h >= height) {
          sum += height
        } else {
          max = Math.max(max, sum)
          largest = Math.max(max, largest)
          sum = 0
        }
      }
      max = Math.max(max, sum)
      largest = Math.max(max, largest)
      heightMap[height] = max
    }
  }
  return largest
}

console.log(largestRectangleArea([1,2,3,4,5,6,2,2]))

function getSmallerIndex(arr, stack, val, i, def) {
  const len = stack.length
  if (!len) {
    stack.push(i)
    return def
  }
  const last = stack[len - 1]
  if (val > arr[last]) {
    stack.push(i)
    return last
  }
  stack.pop()
  return getSmallerIndex(arr, stack, val, i, def)
}

function getLRSmallerIndex (arr = []) {
  let res = []
  let stack = []
  const len = arr.length
  for (let i = 0; i < len; i ++) {
    const val = arr[i]
    res[i] = [getSmallerIndex(arr, stack, val, i, - 1), len]
  }
  stack = []
  for (let i = len - 1; i >= 0; i --) {
    const val = arr[i]
    res[i][1] = getSmallerIndex(arr, stack, val, i, len)
  } 
  return res
}

function largestRectangleArea2(heights) {
  const lrSmaller = getLRSmallerIndex(heights)
  let max = 0
  heights.forEach((h, i) => {
    max = Math.max(max, h * (lrSmaller[i][1] - lrSmaller[i][0] - 1))
  })
  return max
}

console.log(largestRectangleArea2([1,2,3,4,5,6,2,2]))