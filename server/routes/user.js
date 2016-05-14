var express = require('express'),
    mongoose= require('mongoose'),
    User    = mongoose.model('User'),
    userapi = require('../api/user');

var app = module.exports = express.Router();


app.post('/users', function(req, res, next) {
  console.log('POST /users')
    userapi.createUser(req, res, next);
});

app.post('/sessions/create', function(req, res, next) {
  console.log('POST /sessions/create')
    userapi.createSession(req, res, next);
});