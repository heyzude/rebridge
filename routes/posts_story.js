const express = require('express');
const db = require('../models');

const router = express.Router();
/*기능 이니 4개씩 */
router.get('/story', async (req, res, next) => {
  try {
    const posts = await db.BoardStory.findAll({
      include: [{
        model: db.Post,
      }]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/story', async (req, res, next) => {
  try {
    // 데이터는 req.body.type
    const newPost = await db.Post.create({
      type: req.body.type,
      paragraph: req.body.paragraph,
      //share_link: 'https://rebridge.me/bamboo' + string(req.body.id)   share_link를 끝에 id로 해야할 것 같긴 한데 아직 create도 안됐는데 id참조로 일단은 그냥 씀


      // 나머지도 넣기
    });
    await newPost.addStoryBamboo({ // addBoardBamboo를 어떻게 정의해야 하는지...

    })

    // Post에 딸린 사진들이나 동영상은 어떻게 추가해야 될까요? post_photo.js가 아닌 왠만하면 여기에 코드를 쓰는게 맞지 않나요?

  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/story/:id', async (req, res, next) => {
  try {
    const bamboo = await db.BoardBamboo.find({ where: { id: req.params.id } });
    await bamboo.setPost({
      // 수정할 내용
      type: req.body.type,
      status: req.body.status,
      paragraph: req.body.paragraph,  // db.BoardBamboo지 db.Post가 아닌데 paragraph를 이렇게 수정해도 되나요?
    });
    /*
    const newPost = await db.Post.find({ where: { id: req.params.id } });
    await newPost.setPost( {
      paragraph: req.body.paragraph,
    })
    */
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/story/:id', async (req, res, next) => {
  try {
    await db.BoardBamboo.destroy({
      where: { id: req.params.id },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
