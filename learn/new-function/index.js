function a (name, age) {
  alert(name, age);
}

function copyFunction(fn) {
  let str = fn.toString();
  let params = str.match(/^function\s+\w*\s*\(([^)]*)\)\s*\{/)[1].split(/\s*\,\s*/);
  let content = str.replace(/^function\s+\w*\s*\([^)]*\)\s*\{|\}$/g, '');
  params.push(content);
  return new Function(...params);
}

console.log(copyFunction(a).toString());