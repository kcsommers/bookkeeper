require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE NOTE ROUTE');
  const noteData = req.body;
  db.note.create(noteData).then((newNote) => {
    res.json({ newNote: newNote.dataValues });
  }).catch((error) => {
    console.log('ERROR CREATING NOTE', error);
    res.json({ error });
  });
});

module.exports = { router };
