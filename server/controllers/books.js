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
  const { listId } = req.body.miscData;

  console.log('LIST ID', req.body);

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

module.exports = { router };