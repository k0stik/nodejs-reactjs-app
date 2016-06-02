'use strict';

var util = require('util');
var Base = require('./Base');
var merge = require('merge');


function Users(services) {
    if (!services || !services.create) {
        throw 'No services found';
    }

    Users.super_.call(this, services);
}

util.inherits(Users, Base);

Users.prototype.create = function(req, res) {
    var params = req.body;
    console.log('--------------session-------------');
    console.log(req.session);
    console.log('--------------session-------------');
    var promise = this.services.create.run(params).then(function(data) {
        req.session.userId = data.id;
        console.log('--------------session-------------');
        console.log(req.session);
        console.log('--------------session-------------');
        return data;
    });
    this.renderPromise(req, res, promise);
};

Users.prototype.authorize = function(req, res) {
    var params = req.body;
    var promise = this.services.authorize.run(params).then(function(user) {
        req.session.userId = user.id;
        return Promise.resolve({id: user.id});
    });
    this.renderPromise(req, res, promise);
};

Users.prototype.logout = function(req, res) {
    req.session.destroy();
    var promise = Promise.resolve({});
    this.renderPromise(req, res, promise);
};

module.exports = Users;

