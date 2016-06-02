'use strict';

var Promise  = require('bluebird');
var Base = require('../Base');
var util = require('util');
var sequelize = require('../../model/Sequelize');
var Exception = require('../../Exception');

var User = sequelize.import(__dirname + "/../../model/User");

function Create() {
    Create.super_.call(this);
}

util.inherits(Create, Base);

Create.prototype.validate = function(params) {
    var rules = {};

    return this.validator.validate(params, rules);
};

Create.prototype.execute = function(params) {
    return  Promise.resolve({comments: [
        {
            id: 1,
            content: 'test comment 1',
            autor: 'Me'
        },
        {
            id: 2,
            content: 'test comment 2',
            autor: 'Not me'
        }
    ]});
};

module.exports = Create;