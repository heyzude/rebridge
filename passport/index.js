const passport = require('passport');
const localStrategy = require('./localStrategy');
const kakaoStrategy = require('./kakaoStrategy');
const naverStrategy = require('./naverStrategy');
const { User, Follow } = require('../models/index');

module.exports = () => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.find({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  localStrategy(passport);
  kakaoStrategy(passport);
  naverStrategy(passport);
};
