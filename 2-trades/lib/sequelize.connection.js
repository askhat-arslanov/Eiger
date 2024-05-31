const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { Trade } = require('../models/trades');
const ConnectionBase = require('./connection-base');

const connect = () => sequelize.authenticate()
    .then(() => {
        console.log(`SQLite successfully connected!`);
        return Trade.sync();
    })
    .then(result => {
        console.log(`Trades table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })

class SequelizeConnection extends ConnectionBase {
    getConnection() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = connect();
        return this.promise
    }

    async clearDatabase() {
        await Trade.drop();
        return Trade.sync();
    }
}

module.exports = SequelizeConnection;
