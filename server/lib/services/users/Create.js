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
    var rules = {
        Login:    ['required', {'min_length': 5}],
        Password: ['required', {'min_length': 5}, {'equal_to_field' : 'ConfirmPassword'}],
        ConfirmPassword: ['required', {'min_length': 5}, {'equal_to_field' : 'Password'}]
    };

    return this.validator
        .validate(params, rules)
        .then(function(result) {
            return User.findOne({
                where: {
                    login: result.Login
                }
            }).then(function(user) {
                if (user) {
                    var exception =  new Exception({
                        code: 'USER EXISTS',
                        fields: {'login':'WRONG'},
                        message: 'User with this login already exists'
                    });
                    return Promise.reject(exception);
                }
                return Promise.resolve(result);
            });
        });
};

Create.prototype.execute = function(params) {
    return  User.create({
                login: params.Login,
                password: params.Password
            }).then(function(user) {
                return Promise.resolve({id: user.id});
            });
};

module.exports = Create;