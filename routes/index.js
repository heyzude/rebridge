const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.render('class', { title: '클래스' });
  } else {
    res.render('signin', { title: '로그인', loginError: req.flash('loginError') });
  }
});

router.get('/menu', (req, res, next) => {
  res.render('menu', { title: '', user: req.user });
});

router.get('/todaynews', (req, res, next) => {
  res.render('todaynews', { title: '오늘의 뉴스', user: req.user });
});

router.get('/bamboo', (req, res, next) => {
  res.render('bamboo', { title: '대나무숲', user: req.user });
});

router.get('/bamboowrite', (req, res, next) => {
  res.render('bamboowrite', { title: '대나무숲 글쓰기', user: req.user });
});

router.get('/seorosengak', (req, res, next) => {
  res.render('seorosengak', { title: '서로의 생각이 궁금해', user: req.user });
});

router.get('/story', (req, res, next) => {
  res.render('story', { title: '이야기 게시판', user: req.user });
});

router.get('/storywrite', (req, res, next) => {
  res.render('storywrite', { title: '이야기 글쓰기', user: req.user });
});

router.get('/mypage', isLoggedIn, (req, res, next) => {
  res.render('mypage', { title: '마이페이지', user: req.user });
});

router.get('/myinfo', isLoggedIn, (req, res, next) => {
  res.render('myinfo', { title: '기본 개인 정보 수정', user: req.user });
});

router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('signup', { title: '회원가입' });
});

router.get('/signin', isNotLoggedIn, (req, res) => {
  res.render('signin', { title: '로그인', loginError: req.flash('loginError') });
});

router.get('/newsfeed', (req, res) => {
  res.render('newsfeed', { title: '뉴스피드' });
});

router.get('/class', (req, res) => {
  res.render('class', { title: '클래스' });
});

router.get('/class/register', (req, res) => {
  res.render('classform', { title: '클래스 튜터 신청' });
});

router.get('/class/:id', (req, res) => {
  res.render('classpage', { title: '클래스' });
});

module.exports = router;
