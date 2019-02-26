require('dotenv').config();
const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('HIT CREATE BOOK ROUTE');
  const bookData = Object.assign(req.body.bookData, {
    current: false,
    banner: 'https://res.cloudinary.com/kcsommers/image/upload/v1530509212/lflbvvr8kjmgae9suzov.jpg'
  });
  db.book.create(bookData).then((book) => {
    db.list.findByPk(req.body.listId).then((list) => {
      list.addBook(book).then(() => {
        res.json({ book });
      });
    }).catch((addBookError) => {
      console.log('ERROR ADDING BOOK TO LIST', addBookError);
    });
  }).catch((createBookError) => {
    console.log('ERROR CREATING BOOK', createBookError);
  });
});

module.exports = { router };