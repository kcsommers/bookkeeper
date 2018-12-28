require('dotenv').config();
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
});

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
    res.json({ verified: true });
  } else {
    res.json({ verified: false, error: req.error });
  }
});

module.exports = { router };