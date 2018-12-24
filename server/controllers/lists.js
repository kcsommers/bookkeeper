require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE LIST ROUTE');
  const newListData = req.body;

  db.list.create({
    name: newListData.name,
    userId: newListData.userId
  }).then((createdList) => {
    console.log('SUCCESS CREATING LIST');
    res.json(createdList);
  }).catch((error) => {
    console.log('ERROR CREATING LIST', error);
    res.json({ error });
  });
});

module.exports = { router };