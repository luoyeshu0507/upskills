'use strict';
const express = require('express');
const mongoskin = require('mongoskin');
const bodyParser = require('body-parser');
const logger = require('morgan');
const db = mongoskin.db('mongodb://@localhost:27017/test', {safe: true});
const id = mongoskin.helper.toObjectID;

let app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(logger());

app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName);
  return next();
});

app.get('/', (req, res, next) => {
  res.send('select a collection, e.h., /collections/messages');
});

app.get('/collections/:collectionName', (req, res, next) => {
  req.collection.find({}, {
    limit: 10,
    sort: [['_id', -1]]
  }).toArray((e, results) => {
    if (e) next(e);
    res.send(results);
  });
});

app.post('/collections/:collectionName', (req, res, next) => {
  req.collection.insert(req.body, {}, (e, results) => {
    if (e) return next(e);
    res.send(results.ops);
  })
});

app.get('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.findOne({
    _id: id(req.params.id)
  }, (e, results) => {
    if (e) return next(e);
    res.send(results);
  });
});

app.put('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.update({
    _id: id(req.params.id)
  }, {
    $set: req.body
  }, (e, result) => {
    if (e) return next(e);
    res.send((result.result.ok === 1) ? {msg: 'success'} : {msg: 'error'});
  });
});

app.del('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.remove({
    _id: id(req.params.id)
  }, (e, result) => {
    if (e) return next(e);
    res.send((result.result.ok === 1) ? {msg: 'success'} : {msg: 'error'});
  });
});

app.listen(3000, () => {
  console.log('Server is running on 3000');
})























