var fs = require('fs');

function clean() {
  fs.readdir('.', function(err, files) {
    if (!err) {
      files && files.forEach(function(item) {
        if (item.match(/^workbench_?\w+?/)) {
          cleanCssJsFile(item);
        }
      });
    }
  })
}

function cleanCssJsFile(path) {
  fs.readdir(path + '/js', function(err, files) {
    if (!err) {
      files && files.forEach(function(item, index) {
        if (index === 0) {
          console.log(item);
        }
      });
    }
  });
  fs.readdir(path + '/css', function(err, files) {
    if (!err) {
      files && files.forEach(function(item, index) {
        if (index === 0) {
          console.log(item);
        }
      });
    }
  })
}

clean();