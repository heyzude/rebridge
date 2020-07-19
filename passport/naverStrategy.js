const { Strategy } = require('passport-naver');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new Strategy({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SECRET,
    callbackURL: '/users/naver/callback',
    authType: 'reauthenticate',
    passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const exuser = await User.find({ where: { snsId: profile.id, sns: 'naver' } });
      if (!exuser) {
        return done(null, { signup: true, snsId: profile.id, sns: 'naver', nick: profile.displayName });
      }
      return done(null, exuser);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
