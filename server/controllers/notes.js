require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE NOTE ROUTE');
  const { noteData } = req.body;
  db.note.create(noteData).then((newNote) => {
    res.json({ createdItem: newNote.dataValues, error: null });
  }).catch((error) => {
    console.log('ERROR CREATING NOTE', error);
    res.json({ createdItem: null, error });
  });
});

router.post('/:id', (req, res) => {
  console.log('HIT UPDATE NOTE ROUTE');
  const newContent = req.body.itemData.content;
  db.note.update({ content: newContent }, {
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch((error) => {
    console.log('ERROR UPDATING NOTE IN DB', error);
    res.json({ success: false, error });
  });
});

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE NOTE ROUTE');
  db.note.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch((error) => {
    res.json({ success: false, error });
  });
});

module.exports = { router };