require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE BOOK ROUTE');
  const bookData = Object.assign(req.body.itemData, {
    current: false,
    banner: 'https://res.cloudinary.com/kcsommers/image/upload/v1530509212/lflbvvr8kjmgae9suzov.jpg'
  });
  const { listId } = req.body.modelData;
  db.book.create(bookData).then((book) => {
    db.list.findByPk(listId).then((list) => {
      list.addBook(book).then(() => {
        res.json({ createdItem: book, error: null });
      });
    }).catch((addBookError) => {
      console.log('ERROR ADDING BOOK TO LIST', addBookError);
      res.json({ createdItem: null, error: addBookError });
    });
  }).catch((createBookError) => {
    console.log('ERROR CREATING BOOK', createBookError);
    res.json({ createdItem: null, error: createBookError });
  });
});

router.post('/update/:id', (req, res) => {
  console.log('HIT UPDATE BOOK ROUTE');
  db.book.update(req.body, {
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch(error => {
    console.error('ERROR UPDATING BOOK IN DB', error);
    res.json({ success: false, error });
  });
});

router.delete('/:id', (req, res) => {
  console.log('HIT DELETE BOOK ROUTE');
  db.book.destroy({
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch((error) => {
    res.json({ success: false, error });
  });
});

module.exports = { router };