require('dotenv').config();
const db = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passportConfig');
const { hashPassword, verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', hashPassword, (req, res) => {
  console.log('HIT CREATE USER ROUTE');
  if (!res.locals.error) {
    jwt.sign(
      { user: res.locals.username },
      process.env.AUTH_SECRET,
      { expiresIn: '1h' },
      (error, token) => {
        if (!error) {
          res.json({ token });
        } else {
          res.json({ error });
        }
      }
    );
  } else {
    res.json({ error: res.locals.error });
  }
}); // TODO: send user (with empty lists, books, notes and quote arrays) on signup

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  console.log('HIT LOGIN ROUTE');
  const user = req.user.dataValues;
  jwt.sign(
    { user: user.username },
    process.env.AUTH_SECRET,
    { expiresIn: '1h' },
    (error, token) => {
      if (!error) {
        res.json({ user, token });
      } else {
        res.json({ error });
      }
    }
  );
});

router.get('/verify', verifyToken, (req, res) => {
  console.log('HIT VERIFY USER ROUTE');
  if (!req.error) {
    res.json({ verified: true, user: req.user, error: null });
  } else {
    res.json({ verified: false, user: null, error: req.error });
  }
});

router.post('/update/:id', (req, res) => {
  const newData = req.body.itemData;
  db.user.update(newData, {
    where: { id: req.params.id }
  }).then(() => {
    res.json({ success: true, error: null });
  }).catch(updateError => {
    console.log('ERROR UPDATING USER IN DB', updateError);
    res.json({ success: null, error: updateError });
  });
});

module.exports = { router };