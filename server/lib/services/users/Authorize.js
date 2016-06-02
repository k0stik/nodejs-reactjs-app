'use strict';

var Promise   = require('bluebird');
var Base      = require('../Base');
var util      = require('util');
var sequelize = require('../../model/Sequelize');
var Exception = require('../../Exception');

var User = sequelize.import(__dirname + "/../../model/User");

function Create() {
    Create.super_.call(this);
}

util.inherits(Create, Base);

Create.prototype.validate = function(params) {
    var rules = {
        Login:    ['required', {'min_length': 5}],
        Password: ['required', {'min_length': 5}],
    };

    return this.validator.validate(params, rules);
};

Create.prototype.execute = function(params) {
    return  User.findOne({
                where: {
                    login: result.Login
                }
            }).then(function(user) {
                if (user && user.checkPassword(params.Password)) {
                    return Promise.resolve(user);
                } else {
                    var exception = new Exception({
                        code: 'AUTHOIZATION_FAILURE',
                        fields: {
                            'Login':'WRONG',
                            'Password': 'WRONG'
                        },
                        message: 'Wrong login or password'
                    });
                    return Promise.reject(exception);
                }
            });
};

module.exports = Create;

