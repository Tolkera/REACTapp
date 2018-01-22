const mongoose = require('mongoose');
const userModel = require('../models/user');
const taskModel = require('../models/task');
const categoryModel = require('../models/category');

module.exports = function(config){

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log('database open')
    });
};