'use strict';

var util = require('util');
var Base = require('./Base');
var merge = require('merge');


function Comments(services) {
    if (!services || !services.list) {
        throw 'No services found';
    }

    Comments.super_.call(this, services);
}

util.inherits(Comments, Base);

Comments.prototype.list = function(req, res) {
    var params = req.query; //req.body
    var promise = this.services.list.run(params);
    this.renderPromise(req, res, promise);
};

module.exports = Comments;