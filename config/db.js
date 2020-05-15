const Sequelize = require('sequelize');

const sequelizeConnect = new Sequelize('books', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports.sequelize = sequelizeConnect;