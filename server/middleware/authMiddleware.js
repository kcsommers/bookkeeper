require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const createUser = (userData, hash) => {
  return db.user.findOrCreate({
    defaults: {
      username: userData.username,
      email: userData.email,
      image: 'https://res.cloudinary.com/kcsommers/image/upload/v1530162883/vzbo0kvghbp568aswfit.jpg',
      banner: 'https://res.cloudinary.com/kcsommers/image/upload/v1530244104/group-background2.jpg',
      location: 'Earth, Milky Way',
      password: hash
    },
    where: {
      username: userData.username,
      email: userData.email
    }
  }).spread((user, created) => {
    if (created) {
      return { user };
    }
    return {
      error: {
        message: 'Sorry, the username or email you provided is already taken'
      }
    };
  });
};

const hashPassword = (req, res, next) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  if (!userData.username || !userData.email || !userData.password) {
    res.status(422).send({ error: 'Whoa there, you must provide a name, email and password' });
  }

  bcrypt.hash(userData.password, 12).then((hash) => {
    return createUser(userData, hash).then((response) => {
      if (response.user) {
        res.locals.username = response.user.dataValues.username;
        res.locals.email = response.user.dataValues.email;
        res.locals.password = response.user.dataValues.password;
      } else {
        res.locals.error = response.error;
      }
      next();
    }).catch((err) => {
      console.log('ERROR CREATING USER');
      res.json({ error: 'Error Creating User', err });
    });
  }).catch((err) => {
    console.log('ERROR HASHING PASSWORD');
    next(err);
  });
};

const verifyToken = (req, res, next) => {
  console.log('VERIFYING (MIDDLEWARE)');
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, process.env.AUTH_SECRET, (error, authData) => {
      if (!error) {
        db.user.findOne({
          where: { username: authData.user },
          include: [{
            model: db.list,
            include: [{
              model: db.book,
              include: [db.note, db.quote]
            }]
          }]
        }).then((authUser) => {
          const user = authUser.dataValues;
          delete user.password;
          req.user = user;
          next();
        }).catch((err) => {
          console.log('ERROR FINDING USER', err);
        });
      } else {
        req.error = error;
        next();
      }
    });
  } else {
    console.log('NO AUTHORIZATION HEADER');
    res.sendStatus(403);
  }
};

module.exports = { hashPassword, verifyToken };