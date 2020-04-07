console.log(1, __filename, __webpack_public_path__);
console.log(process.env.NODE_ENV);
var load = require("little-loader");

load("http://example.com/foo.js", function (err) {
  // ... your code ...
});
console.log(__filename);