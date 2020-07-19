const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Share = require('./shares')(sequelize, Sequelize);
db.Report = require('./user')(sequelize, Sequelize);
db.PostPhoto = require('./post_photo')(sequelize, Sequelize);
db.BoardBamboo = require('./board_bamboo')(sequelize, Sequelize);
db.Class = require('./class')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.HowDoYouThink = require('./how_do_you_think')(sequelize, Sequelize);
db.PostVideo = require('./post_video')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);
db.QuestionOption = require('./question_option')(sequelize, Sequelize);
db.BoardStory = require('./board_story')(sequelize, Sequelize);

module.exports = db;
