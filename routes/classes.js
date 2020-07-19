const { Router } = require('express');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const db = require('../models');
const path = require('path');

const router = Router();
const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: 'rebridge.me',
    projectId: 'rebridge-210303',
    keyFilename: 'servicekey.json',
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get('/classes', async (req, res, next) => {
  const classes = await db.Class.findAll();
  res.json(classes);
});

router.post('/', async (req, res, next) => {

});

router.post('/profile-photo', upload.single('photo'), async (req, res, next) => {
  console.log(req.file);
  res.json(req.file.path);
});

router.post('/class-photo', upload.single('photo'), async (req, res, next) => {
  console.log(req.file);
  res.json(req.file.path);
});

module.exports = router;
