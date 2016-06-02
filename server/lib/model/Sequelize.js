var Sequelize = require('sequelize');
var database = 'chat';
var user = 'root';
var password = '';

var sequelize = new Sequelize(database, user, password, {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;