var express = require('express')
var jwt = require('express-jwt')

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
  return res.status(200).send({ data: { id: 1, type:'user', attributes:{ username: 'colby' }}});
});
