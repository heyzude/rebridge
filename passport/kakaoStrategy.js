const { Strategy } = require('passport-kakao');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new Strategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/users/kakao/callback',
    passReqToCallback: true,
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      const exuser = await User.find({ where: { snsId: profile.id, sns: 'kakao' } });
      if (!exuser) {
        return done(null, { signup: true, snsId: profile.id, sns: 'kakao', nick: profile.username });
      }
      return done(null, exuser);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
