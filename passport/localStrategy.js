const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models/index');

module.exports = (passport) => {
  passport.use(new Strategy({
    usernameField: 'login_id',
    passwordField: 'password',
  }, async (id, password, done) => {
    try {
      const user = await User.find({ where: { loginId: id } });
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        }
        return done(null, false, { message: '아이디와 비밀번호 조합이 맞지 않습니다.' });
      }
      return done(null, false, { message: '아이디와 비밀번호 조합이 맞지 않습니다.' });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
