var express = require('express')
var jwt = require('express-jwt')

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: "SUPER SECRET"
});

app.use('/protected', jwtCheck);

app.get('/protected/test', function(req, res, next) {
    res.send("correct");
});

