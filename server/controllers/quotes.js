require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE QUOTE ROUTE');
  const quoteData = req.body.itemData;
  db.quote.create(quoteData).then((newQuote) => {
    res.json({ createdItem: newQuote.dataValues, error: null });
  }).catch((error) => {
    console.log('ERROR CREATING QUOTE', error);
    res.json({ createdItem: null, error });
  });
});

module.exports = { router };