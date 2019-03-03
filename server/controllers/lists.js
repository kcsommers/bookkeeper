require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE LIST ROUTE');
  const { name, userId } = req.body.itemData;
  db.list.create({ name, userId }).then((createdList) => {
    res.json({ createdItem: createdList, error: null });
  }).catch((error) => {
    console.log('ERROR CREATING LIST', error);
    res.json({ createdItem: null, error });
  });
});

module.exports = { router };