module.exports = (sequelize, Sequelize) => {
  const PostVideo = sequelize.define('PostVideo', {

    file_path: {
      type: Sequelize.STRING(80),
      allowNull: false
    },

    size: {     // in Byte
      type:Sequelize.INTEGER(20),
      allowNull: false
    },

    duration: {      // in Seconds
      type:Sequelize.INTEGER(20)
    }
  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '게시글에 올라간 동영상',
    underscored: true,
  });
  PostVideo.associate = (db) => {
    db.PostVideo.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return PostVideo;
};


