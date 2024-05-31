const SequelizeConnection = require('./lib/sequelize.connection');
const connectionManager = new SequelizeConnection();

module.exports = connectionManager;
