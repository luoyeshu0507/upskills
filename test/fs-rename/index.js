var fs = require('fs');
fs.readdir('.', (err, files) => {
  if(!err) {
    files.forEach((file) => {
      if (file !== 'index.js') {
        var newName = file.replace(/^\w+/, Math.random().toString(36).substr(2))
        fs.rename(file, newName, (err)=>{
          if (err) throw err;
        })
      }
    })
  } else {
    throw err;
  }
})