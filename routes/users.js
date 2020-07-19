const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12);
    const dateOfBirth = new Date(req.body.birthdate.substr(0, 4), Number(req.body.birthdate.substr(4, 2)) - 1, req.body.birthdate.substr(6, 2));
    await User.create({
      loginId: req.body.login_id,
      password,
      name: req.body.nickname,
      phone: req.body.phonenumber,
      dateOfBirth,
      snsId: req.body.sns_id,
      sns: req.body.sns || 'local',
    });
    res.redirect('/signin');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /users/id/zerocho
router.get('/id/:id', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.find({ where: { id: req.params.id }});
    if (user) {
      res.json({ msg: false });
    } else {
      res.json({ msg: true });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/name/:name', isNotLoggedIn, async (req, res, next) => {
  try {
    const user = await User.find({ where: { name: req.params.name }});
    if (user) {
      res.json({ msg: false });
    } else {
      res.json({ msg: true });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      req.flash('loginError', info.message);
      return res.redirect('/signin');
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
});

router.get('/signout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/signin');
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  console.log(req.body);
  // db.User.update({
  //
  // }, {
  //   where: { login_id: req.params.id },
  // });
  res.redirect('/myinfo');
});

router.get('/kakao', isNotLoggedIn, passport.authenticate('kakao'));

router.get('/kakao/callback', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('kakao', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (user && user.signup) {
      res.render('signup', user);
    } else {
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect('/');
      })
    }
  })(req, res, next);
});

router.get('/naver', isNotLoggedIn, passport.authenticate('naver'));

router.get('/naver/callback', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('naver', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (user && user.signup) {
      res.render('signup', user);
    } else {
      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect('/');
      })
    }
  })(req, res, next);
});

module.exports = router;
