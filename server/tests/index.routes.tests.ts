import * as chai from 'chai';
const should = chai.should();
const chaiHttp = require('chai-http');
import * as server from '../bin/www';

chai.use(chaiHttp);

describe('index api', () => {
  it('should response on /', (done) => {
    chai.request(server.server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
  it('should response on /api', (done) => {
        chai.request(server.server)
    .get('/api')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
  it('should status 404 on  not found page', (done) => {
    chai.request(server.server)
    .get('/incorrectpath')
    .end(function(err, res){
      res.should.have.status(404);
      done();
    });
  });
});
