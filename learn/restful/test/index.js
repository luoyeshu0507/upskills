'use strict';
const superagent = require('superagent');
const expect = require('expect.js');

describe('express rest api server', () => {
  let id;
  it('post object', (done) => {
    superagent.post('http://localhost:3000/collections/test')
    .send({
      name: 'lzw',
      email: 'luoyeshu@luoyeshu.com'
    })
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(res.body.length).to.eql(1);
      expect(res.body[0]._id.length).to.eql(24);
      id = res.body[0]._id;
      done();
    })
  });

  it('get an object', (done) => {
    superagent.get('http://localhost:3000/collections/test/' + id)
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body._id.length).to.eql(24);
      expect(res.body._id).to.eql(id);
      done();
    })
  });

  it('get a list', (done) => {
    superagent.get('http://localhost:3000/collections/test')
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(res.body.length).to.be.above(0);
      expect(res.body.map((item) => item._id)).to.contain(id);
      done();
    })
  });

  it('update an object', (done) => {
    superagent.put('http://localhost:3000/collections/test/' + id)
    .send({
      name: 'lzw',
      email: 'luoyeshu2@luoyeshu.com'
    })
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('success');
      done();
    })
  });

  it('check the updated object', (done) => {
    superagent.get('http://localhost:3000/collections/test/' + id)
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body._id.length).to.eql(24);
      expect(res.body._id).to.eql(id);
      expect(res.body.email).to.eql('luoyeshu2@luoyeshu.com');
      done();
    })
  });

  it('remove the object', (done) => {
    superagent.del('http://localhost:3000/collections/test/' + id)
    .end((e, res) => {
      expect(e).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(res.body.msg).to.eql('success');
      done();
    })
  });
});