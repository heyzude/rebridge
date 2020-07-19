module.exports = (sequelize, Sequelize) => {
  const PostPhoto = sequelize.define('PostPhoto', {

    file_path: {
      type: Sequelize.STRING(80),
      allowNull: false
    },

    size: {     // in Byte
      type:Sequelize.INTEGER(20),
      allowNull: false
    }

  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '게시글에 올라간 사진',
    underscored: true,
  });
  PostPhoto.associate = (db) => {
    db.PostPhoto.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return PostPhoto;
};


