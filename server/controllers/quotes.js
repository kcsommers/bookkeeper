require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE QUOTE ROUTE');
  const quoteData = req.body;
  db.quote.create(quoteData).then((newQuote) => {
    res.json({ newQuote: newQuote.dataValues });
  }).catch((error) => {
    console.log('ERROR CREATING QUOTE', error);
    res.json({ error });
  });
});

module.exports = { router };