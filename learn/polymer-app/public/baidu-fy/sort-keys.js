const sortkeys = (obj) => {
  let keys = Object.keys(obj).sort();
  let temp = {};
  keys.forEach((item) => {
    temp[item] = obj[item];
  });
  console.log(JSON.stringify(temp));
}

sortkeys();