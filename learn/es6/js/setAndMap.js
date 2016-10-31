"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var set = new Set([1, 2, 3, 4, 5, 5]);
console.log([].concat(_toConsumableArray(set)));