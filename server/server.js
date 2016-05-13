// server.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var glob = require('glob');
// set our port
var port = process.env.PORT || 8080;

// set up mongoose, assume locally installed
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/seeker');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

// startup our app at http://localhost:3000
app.listen(port);

// expose app
exports = module.exports = app;