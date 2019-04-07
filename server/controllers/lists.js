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

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE LIST ROUTE');
  db.book.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch((error) => {
    res.json({ success: false, error });
  });
});

module.exports = { router };