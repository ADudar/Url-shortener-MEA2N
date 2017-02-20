// var express = require('express')
// var request = require('supertest');
// var equal = require('mocha').equal;
var chai = require('chai');
var should = chai.should();
var config = require('../config/config');
var mongoose = require('mongoose');
// var should = require('should');
var User = require('../models/user');

describe('User Model Unit Tests:', function () {

	before(function (done) {
		user = new User({
			email: 'test@test.com',
			username: 'username',
			password: 'password',
		});
		mongoose.connect(config.mongoUri);
		done();
	});

	describe('Method Save', function () {
		it('should be able to save without problems', function (done) {
			user.save(done);
		});

		after(function (done) {
			User.remove({
				username: 'username'
			}).exec();
			mongoose.disconnect();
			done();
		});
	});
});