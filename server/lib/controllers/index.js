'use strict';

var services = require('../services');
var Users = require('./Users');
var Comments = require('./Comments');
var Session = require('./Session');

module.exports = {
    'users': new Users(services.users),
    'comments': new Comments(services.comments),
    'session': new Session(services.users)
};