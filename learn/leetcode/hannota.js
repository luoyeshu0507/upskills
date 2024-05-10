function hannota(n, a = 'A', b = 'B', c = 'C') {
  if (n === 1) {
    return console.log(`${a} => ${c}`)
  } else {
    hannota(n - 1, a, c, b)
    hannota(1, a, b, c)
    hannota(n - 1, b, a, c)
  }
}
