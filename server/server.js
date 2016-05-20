// server.js
'use strict'
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(8082);
var bodyParser = require('body-parser');
var glob = require('glob');

// set our port
var port =  8081;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seeker');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','https://seeker-crodeheaver.c9users.io');
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH');
    next();
});

app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

var models = glob.sync('./models/*.js');
models.forEach(function(model) {
    require(model);
});

// Routes API
app.use(require('./routes/protected'));
app.use(require('./routes/user'));

require('./sockets/sockets')(io)

app.listen(port,function () {
  console.log('Seeker listening on port ' + port);
});
// expose app
exports = module.exports = app;
