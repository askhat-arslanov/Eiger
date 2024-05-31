const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const TradeTypes = ['buy', 'sell'];

const TradeShareMin = 1;

const TradeShareMax = 100;

const Trade = sequelize.define(
  'Trade',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM(TradeTypes),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shares: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: TradeShareMin,
        max: TradeShareMax,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = {
  Trade,
  TradeTypes,
  TradeShareMin,
  TradeShareMax,
};
