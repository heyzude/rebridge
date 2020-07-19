module.exports = (sequelize, Sequelize) => {
  const Share = sequelize.define('Share', {

  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '신고기록',
    underscored: true,
  });
  Share.associate = (db) => {
    db.Shares.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Shares.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return Share;
};




