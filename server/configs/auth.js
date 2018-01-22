const passport = require('passport');
const pluckData = require('../utilities/pluck-data').user;

exports.authenticate = function(req, res, next){
    req.body.username = req.body.username.toLocaleLowerCase();
    var auth = passport.authenticate('local', function(err, user){
        if(err){return next(err)}
        if(!user) {
            var loginErr = new Error('Incorrect login data');
            res.status(400);
            return res.send({reason: loginErr.toString(), code:103})
        }

        req.logIn(user, function(err){
            if(err){return next(err)}
            res.send(pluckData(user))
        });
    });

    auth(req, res, next)
};



