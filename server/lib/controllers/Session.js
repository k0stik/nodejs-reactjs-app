'use strict';

var util = require('util');
var Base = require('./Base');


function Session(services) {
    if (!services || !services.create) {
        throw 'No services found';
    }

    Session.super_.call(this, services);
}

util.inherits(Session, Base);

Session.prototype.create = function(req, res) {
    var params = req.body;

    var promise = this.services.authorize.run(params).then(function(user) {
        req.session.userId = user.id;
        return Promise.resolve({id: user.id});
    });

    this.renderPromise(req, res, promise);
};

module.exports = Session;

