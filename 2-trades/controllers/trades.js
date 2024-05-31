const { Trade, TradeTypes, TradeShareMin, TradeShareMax } = require('../models/trades');

// Create a new trade
exports.createTrade = async (req, res) => {
  try {
    const { type, user_id, symbol, shares, price, timestamp } = req.body;

    if (shares < TradeShareMin || shares > TradeShareMax) {
      return res
        .status(400)
        .json({ error: `Shares value must be between ${TradeShareMin} and ${TradeShareMax}` });
    }

    if (!TradeTypes.includes(type)) {
      return res
        .status(400)
        .json({ error: `Type must match one of the following: ${TradeTypes.join(', ')}` });
    }

    const newTrade = await Trade.create({
      type,
      user_id,
      symbol,
      shares,
      price,
      timestamp,
    });

    res.status(201).json(newTrade);
  } catch (error) {
    console.error('Error creating trade:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all trades
exports.getAllTrades = async (req, res) => {
  try {
    const { type, user_id } = req.query;

    const whereClause = {};
    if (type) whereClause.type = type;
    if (user_id) whereClause.user_id = user_id;

    const allTrades = await Trade.findAll({
      where: whereClause,
      order: [['id', 'ASC']],
    });

    res.status(200).json(allTrades);
  } catch (error) {
    console.error('Error fetching trades:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get trade by ID
exports.getTradeById = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const trade = await Trade.findByPk(tradeId);

    if (trade) {
      res.status(200).json(trade);
    } else {
      res.status(404).send('ID not found');
    }
  } catch (error) {
    console.error('Error fetching trade:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Method not allowed
exports.methodNotAllowed = (_, res) => {
  res.status(405).json({ error: 'Method not allowed' });
};
