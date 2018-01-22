const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

module.exports = function(app, config){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.set('port', config.port);
    app.use(cookieParser());
    app.use(session({
        secret: 'gmot',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public/'))
}