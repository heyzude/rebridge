module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Comment', {

    paragraph: {
      type: Sequelize.STRING()
    },

    nested_comment: {  // 이 댓글이 다른 댓글에 대한 대댓글인지의 여부. -1 이면 이 댓글은 대댓글이 아니다. -1 이외 다른 값이면, "order"번째의 댓글에 대한 대댓글이다.
      type: Sequelize.INTEGER,
      defaultValue: -1
    },

    order: {  // 만약 nested_comment값이 -1이라면 (대댓글이 아니라면) 그냥 댓글의 씌여진 순서. nested_comment 값이 -1이라면 해당 댓글의 대댓글 중 몇번째 대댓글인지에 대한 것
      type: Sequelize.INTEGER
    }

  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '댓글',
    underscored: true,
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Comment.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return Comment;
};




