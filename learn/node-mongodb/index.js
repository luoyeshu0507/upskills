'use strict';
const mongo = require('mongodb');
const dbHost = 'localhost';
const dbPort = '27017';

const Db = mongo.Db;
const Connection = mongo.Connection;
const Server = mongo.Server;
let db = new Db('local', new Server(dbHost, dbPort), {safe: true});

db.open((err, dbConnection) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('db state', db._state);
  let item = {
    name: 'lzw'
  };
  dbConnection.collection('messages').insert(item, (err, item) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.info('created/inserted: ', item);
    db.close();
    process.exit(0);
  });
});