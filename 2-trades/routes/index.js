const express = require('express');
const router = express.Router();

const tradeRoutes = require('./trades');

/* GET home page. */
router.get('/', function (_, res) {
  res.send('<p>HTML Data</p>');
});

module.exports = router;
