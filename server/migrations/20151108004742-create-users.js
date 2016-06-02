'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'users',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: false
            },
            addTime: {
                type: Sequelize.DATE,
                field: 'add_time',
                defaultValue: Sequelize.NOW
            },
            updateTime: {
                type: Sequelize.DATE,
                field: 'update_time'
            }
        },
        {
            engine: 'InnoDB',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
