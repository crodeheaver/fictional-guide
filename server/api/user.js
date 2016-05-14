var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = mongoose.model('User');

function createToken(user) {
  return jwt.sign(user, "SUPER SECRET", { expiresIn: 60*60*5 });
}

module.exports.createUser = function(req, res, next) {
   if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    new User({
      username: req.body.username,
      password: req.body.password,
    })
    .save()
    .then(function (user) {
        res.status(201).send({
            access_token: createToken(user)
        });
    })
    .catch(function (err) {
        next(err)
    })
};

module.exports.tokens = function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    User
        .findOne({
            username: req.body.username
        })
        .exec()
        .then(function(user) {
            if (!user) {
                return res.status(401).send("The username or password don't match");
            }

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    res.status(201).send({
                        access_token: createToken(user)
                    });
                }
            });
        })
        .catch(function(err) {
            next(err)
        })
}
