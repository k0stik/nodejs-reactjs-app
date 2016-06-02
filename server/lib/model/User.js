var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set: function(password) {
                this._password = password;
                this.setDataValue('salt', this.makeSalt());
                this.setDataValue('password', this.encryptPassword(password));
            }
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {

        createdAt: 'add_time',
        updatedAt: 'update_time',
        instanceMethods: {
            checkPassword: function(plainText) {
                return this.encryptPassword(plainText) === this.passwordHash;
            },
            makeSalt: function() {
                return Math.round((new Date().valueOf() * Math.random())) + '';
            },
            encryptPassword: function(password) {
                try {
                    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
                } catch (err) {
                    return '';
                }
            }
        }
    });
};