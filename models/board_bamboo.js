module.exports = (sequelize, Sequelize) => {
  const BoardBamboo = sequelize.define('BoardBamboo', {
    bamboo_number: {    // "# 번째 게시물" 할때 쓰임
      type: Sequelize.INTEGER()
    },

    gomin_type: {    // gomin type has to be classified, in order to be represented by a number.
      type: Sequelize.INTEGER()
    },
  }, {
    comment: '대나무숲에 속하는 게시글이면 board_bamboo 에 해당 게시글의 uuid가 저장된다',
    underscored: true,
  });
  BoardBamboo.associate = (db) => {
    db.BoardBamboo.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return BoardBamboo;
};


