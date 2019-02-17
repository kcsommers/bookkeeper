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

router.post('/:id', (req, res) => {
  console.log('HIT UPDATE NOTE ROUTE', req.body);
  const { newContent } = req.body;
  db.note.update({ content: newContent }, {
    where: { id: req.params.id }
  }).then((updatedBook) => {
    res.json({ success: updatedBook });
  }).catch((error) => {
    console.log('ERROR UPDATING NOTE IN DB', error);
    res.json({ error });
  });
});

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE NOTE ROUTE');
  db.note.destroy({
    where: { id: req.params.id }
  }).then((deleteResults) => {
    res.json({ success: deleteResults, error: null });
  }).catch((error) => {
    res.json({ success: null, error });
  });
});

module.exports = { router };
