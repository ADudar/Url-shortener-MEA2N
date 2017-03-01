import * as chai from 'chai';
const should = chai.should();
const chaiHttp = require('chai-http');
import * as server from '../bin/www';
chai.use(chaiHttp);
import { User } from '../models/user';
import { Link } from '../models/link';
import * as jwtDecode from 'jwt-decode';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';


describe('links api', () => {
  let token = '';
  let user_id = '';
  const user = new User({
    username: 'testuser1',
    password: 'password1',
    email: 'emailtestuser@mail.ru',
  });

  before('clear the collection of users', (done) => {
    Link.collection.drop();
    User.collection.drop();

    chai.request(server.server)
      .post('/api/user')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        user_id = jwtDecode(token).user_id;
        done();
      });
  });

  beforeEach((done) => {
    Link.remove({}, (err) => {
      done();
    });
  });

  describe('adding link tests', () => {
    it('should add user\s link', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        description: 'site mail.ru',
        tags: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(true);
          res.body.should.have.property('message');
          res.body.should.have.property('_id');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Link added');
          done();
        });
    });

    it('should error adding link without authorization', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        description: 'site mail.ru',
        tags: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .send(link)
        .end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('No authorization token was found');
          done();
        });
    });

    it('should error adding link without longUrl', (done) => {

      const link = new Link({
        shortUrl: 'hsdfu4',
        description: 'site mail.ru',
        tags: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.message.should.be.eql('Link validation failed');
          done();
        });
    });

    it('should error adding link without shortUrl', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        description: 'site mail.ru',
        tags: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.message.should.be.eql('Link validation failed');
          done();
        });
    });

    it('should error adding link without description', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        tags: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.message.should.be.eql('Link validation failed');
          done();
        });
    });

    it('should error adding link without tags', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        description: 'mail ru',
        user_id: Types.ObjectId(user_id)

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.message.should.be.eql('Link validation failed');
          done();
        });
    });

    it('should error adding link without user_id', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        tags: 'mail ru',
        description: 'mail ru'

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('user_id is required');
          done();
        });
    });

    it('should error adding link with wrong longUrl', (done) => {

      const link = new Link({
        longUrl: 'fdklls',
        shortUrl: 'hsdfu4',
        tags: 'mail ru',
        description: 'mail ru',
        user_id: user_id

      }); // create a new instance of the Link model

      chai.request(server.server)
        .post('/api/links')
        .set('Authorization', 'Bearer ' + token)
        .send(link)
        .end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.success.should.be.a('boolean');
          res.body.success.should.equal(false);
          res.body.message.should.be.eql('Link validation failed');
          done();
        });
    });

  });

  describe('should response to count of clicks', () => {
    it('should be correct value of clicks', (done) => {

      const link = new Link({
        longUrl: 'http://mail.ru',
        shortUrl: 'hsdfu4',
        tags: 'mail ru',
        description: 'mail ru',
        user_id: user_id

      }); // create a new instance of the Link model
      link.save((err, res: any) => {
        res.clicks = 100;
        res.save(() => {
        });
      });
      chai.request(server.server)
        .get('/api/links/clicks')
        .set('Authorization', 'Bearer ' + token)
        .query({ user_id: user_id })
        .end(function (err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalClicks');
          res.body.totalClicks.should.be.a('number');
          res.body.totalClicks.should.equal(100);
          done();
        });
    });

  });

  describe('other tests', () => {
//
  });

  after('clear the collection of users', (done) => {
    Link.collection.drop();
    User.collection.drop();
    done();

  });

});
