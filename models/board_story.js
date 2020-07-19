module.exports = (sequelize, Sequelize) => {
  const BoardStory = sequelize.define('BoardStory', {

  }, {
    comment: '이야기게시판에 속하는 게시글이면 board_story에 해당 게시글의 id가 저장된다',
    underscored: true,
  });
  BoardStory.associate = (db) => {
    db.BoardStory.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return BoardStory;
};


