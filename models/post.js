module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
    status: {
      type: Sequelize.INTEGER,  // 혹시나 상태값이 필요할까봐
      allowNull: false
    },

    share_link: {
      type: Sequelize.STRING(50)
    },

    number_of_views: {
      type: Sequelize.INTEGER,
    },

    type: {
      type: Sequelize.INTEGER,
    },

  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '게시글',
    underscored: true,
  });
  Post.associate = (db) => {
    db.Post.hasMany(db.PostPhoto);
    db.Post.hasMany(db.PostVideo);
    db.Post.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Post.belongsToMany(db.User, { through: 'likes' }); // N:M relationship
    db.Post.belongsToMany(db.User, { through: 'shares' }); // N:M relationship
    db.Post.hasMany(db.BoardBamboo);
    db.Post.hasMany(db.BoardStory);
  };
  return Post;
};


