const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

passport.serializeUser((user, cb) => { cb(null, user.id); });

passport.deserializeUser((id, cb) => {
  db.user.findById(id).then((user) => {
    cb(null, user);
  }).catch(cb);
});

const localOptions = { usernameField: 'username', passwordField: 'password' };

const localCallback = (username, password, done) => {
  db.user.findOne({
    where: { username },
    include: [{
      model: db.list,
      include: [db.book]
    }]
  }).then((user) => {
    if (!user) {
      console.log('NO USER OR BAD PASSWORD');
      done(null, false);
    } else {
      bcrypt.compare(password, user.password).then((passwordValid) => {
        console.log('PSWORD ALID', passwordValid);
        return (passwordValid) ? done(null, user) : done(null, false);
      }).catch((error) => {
        console.log('ERROR WITH BCRYPT COMPARE', error);
      });
    }
  }).catch((error) => {
    console.log('ERROR FINDING USER IN DB', error);
    done(error, false);
  });
};

const localLogin = new LocalStrategy(localOptions, localCallback);

passport.use(localLogin);

module.exports = passport;