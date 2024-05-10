function emptyTemp(temp, res, preMin) {
  while (temp) {
    if (temp < preMin) {
      res.push(preMin)
      preMin = 0
      temp --
    } else {
      res.push(temp --)
    }
  }
}

function shareSweets(arr) {
  const temp = 0
  const res = []
  const len = arr.length
  let preMin = 0
  for (let i = 0; i < len; i ++) {
    const pre = arr[i] || 0
    const cur = arr[i]
    if (cur > pre) {
      emptyTemp(temp, res, preMin)
      temp = 0
      res.push(res[res.length - 1] + 1)
      preMin = res[res.length - 1] + 1
    } else if (cur === pre) {
      emptyTemp(temp, res, preMin)
      temp = 1
      preMin = 0
    } else {
      temp ++
    }
    pre = cur
  }
  emptyTemp(temp, res, preMin)
  return res
}