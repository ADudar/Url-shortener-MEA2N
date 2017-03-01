import * as chai from 'chai';
const should = chai.should();
const chaiHttp = require('chai-http');
import * as server from '../bin/www';
chai.use(chaiHttp);
import { User } from '../models/user';


describe('users api', () => {

  before('clear the collection of users', (done) => {
    User.collection.drop();
    done();
  });

 describe('registration tests', () => {
    it('should register user', (done) => {
    chai.request(server.server)
      .post('/api/user')
      .send({ 'username': 'testuser0', 'password': 'passwordtestuser0', 'email': 'testuser0@mail.ru' })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.be.a('boolean');
        res.body.success.should.equal(true);
        res.body.should.have.property('token');
        res.body.token.should.be.a('string');
        done();
      });
  });

  it('should error register user with equal username', (done) => {
    chai.request(server.server)
      .post('/api/user')
      .send({ 'username': 'testuser0', 'password': '567475745745', 'email': 'fdsklj@mail.ru' })
      .end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.be.a('boolean');
        res.body.success.should.equal(false);
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
      });
  });

  it('should error register user with equal email', (done) => {
    chai.request(server.server)
      .post('/api/user')
      .send({ 'username': 'testuser1', 'password': '54545', 'email': 'testuser0@mail.ru' })
      .end(function (err, res) {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.be.a('boolean');
        res.body.success.should.equal(false);
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        done();
      });
  });
 });

  describe('login tests', () => {
    it('should login success', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({ 'username': 'testuser0', 'password': 'passwordtestuser0' })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(true);
          res.body.should.have.property('token');
          res.body.token.should.be.a('string');

          done();
        });
    });

    it('should login error, user not found', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({ 'username': 'testuser1', 'password': '54545' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.contain('User not found');
          done();
        });
    });

    it('should login error, login without password', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({ 'username': 'testuser1' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.contain('You must send the username and the password');
          done();
        });
    });

    it('should login error, login without login', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({ 'password': 'passwordtestuser1' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.contain('You must send the username and the password');
          done();
        });
    });

    it('should login error, login with empty body', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({})
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.contain('You must send the username and the password');
          done();
        });
    });

    it('should login error, login with wrong password', (done) => {
      chai.request(server.server)
        .post('/api/login')
        .send({ 'username': 'testuser0', 'password': 'passtestuser0' })
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.contain('Wrong password');
          done();
        });
    });
  });


  after('clear the collection of users', (done) => {
    User.collection.drop();
    done();
  });
});
