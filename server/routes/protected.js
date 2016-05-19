var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var Room = mongoose.model('Room');
var _= require('lodash');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: "SUPER SECRET"
});

app.use('/api', jwt({secret: "SUPER SECRET"}));

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
  return res.status(200).send({ data: { id: req.user._doc._id, type:'user', attributes:{ username: req.user._doc.username }}});
});

app.post('/api/rooms', function(req, res){
  console.log('POST /api/rooms');
  var newRoom = {
    name: req.body.data.attributes.name,
    owner: req.user._doc._id,
    messges: [],
    users: []
  }
  new Room(newRoom)
        .save()
        .then(function(room) {
            res.status(201).json({ data: { id: newRoom._id, type: 'room', attributes: _.omit(room, ['_id'])} });
        })
        .catch(function(err) {
            res.send(err);
        });
})

app.get('/api/rooms', function (req, res){
  console.log('GET /api/rooms');
  Room.find()
  .sort({name: 1})
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

app.get('/api/rooms/:name', function (req, res){
  console.log('GET /api/room/'+req.params.name);
  Room.findOne({name:req.params.name})
  .exec()
  .then(function(room){
    return res
    .status(201)
    .send({ data: { id: room._id, type: 'room', attributes: _.omit(room, ['_id'])} })
  })
})

app.patch('/api/rooms/:_id', function(req, res){
  console.log('PATCH /api/rooms');
  
  
  var updatedRoom = {
    name: req.body.data.attributes.name,
    owner: req.user._doc._id,
    messages: req.body.data.attributes.messages,
    users: req.body.data.attributes.users
  }
  
  Room.findByIdAndUpdate(req.body.data.id, updatedRoom)
        .exec()
        .then(function(room) {
            res.status(200).json({ data: room });
        })
        .catch(function(err) {
            res.send(err);
        });
})