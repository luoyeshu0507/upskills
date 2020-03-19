var locationList = [
  { id: 0, name: "中国" },
  { id: 1, pid: 0, name: "广东省" }, 
  { id: 2, pid: 1, name: "深圳市" }, 
  { id: 3, pid: 1, name: "广州市" },
  { id: 4, pid: 3, name: "北京市" }
]

function buildLocationTree(list) {
  if (!Object.prototype.toString.call(list).toLocaleLowerCase() === '[object array]' || list.length === 0) return [];
  var idMap = {};
  var root = null;
  list.forEach(function(item) {
    !idMap[item.id] && (idMap[item.id] = item);
  })
  list.forEach(function(item) {
    if (item.pid && idMap[item.pid]) {
      var parent = idMap[item.pid];
      if (parent.subLocations) {
        parent.subLocations.push(item);
      } else {
        parent.subLocations = [item];
      }
    } else if (!item.pid) {
      root = item;
    }
  })
  return {
    root: root
  }
}

var locationTree = buildLocationTree(locationList); 
console.log(JSON.stringify(locationTree));