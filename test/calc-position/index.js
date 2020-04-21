function calcPosition(start, angle, length) {
  let {x, y} = start;
  angle = angle * Math.PI / 180;
  return {
    x: parseFloat((Math.cos(angle) * length + x).toFixed(3)),
    y: parseFloat((Math.sin(angle) * length + y).toFixed(3))
  }
}

console.log(calcPosition({x: 0, y: 0}, 0, 1));
console.log(calcPosition({x: 0, y: 0}, 90, 1));
console.log(calcPosition({x: 0, y: 0}, 270, 1));

