var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var _= require('lodash');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: "SUPER SECRET"
});

app.use('/api', jwtCheck);

app.get('/api/codes', function (req, res) {
  return res.status(200).send({
    data: [
      { type: 'code', id: 1, attributes: { description: 'Obama Nuclear Missile Launching Code is: lovedronesandthensa'} },
      { type: 'code', id: 2, attributes: { description: 'Putin Nuclear Missile Launching Code is: invasioncoolashuntingshirtless'} }
    ]
  });
});

app.get('/api/users', function (req, res) {
  console.log('GET /api/users');
  return res.status(200).send({ data: { id: req.user._id, type:'user', attributes:{ username: req.user.username }}});
});

app.post('/api/rooms', function(req, res){
  console.log('POST /api/rooms');
  var newRoom = {
    _id: req.body.data._id,
    owner: req.body.data.user._id,
    messges: [],
    users: []
  }
  new Room(newRoom)
        .save()
        .then(function(room) {
            res.status(201).json({ data: student });
        })
        .catch(function(err) {
            res.send(err);
        });
})

app.get('/api/rooms', function (req, res){
  console.log('GET /api/rooms');
  Room.find()
  .exec()
  .then(function(rooms){
    var jsonapi = rooms.map(function(room){
      return { id: room._id, type: 'room', attributes: _.omit(room, ['_id'])}
    })
    return res
    .status(200)
    .send({ data: jsonapi })
  })
})
