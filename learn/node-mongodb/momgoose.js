var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log(callback);
});

var Book = mongoose.model('User', {name: String, price: Number});
var oneBook = new Book({name: 'Storys', price: 18.88});
oneBook.save(function(err, result) {
  if(err) {
    console.log(err);
    process.exit(0);
  } else {
    console.log(result);
    process.exit(1);
  }
})