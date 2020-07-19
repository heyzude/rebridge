module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define('Report', {

    report_reason: {
      type: Sequelize.STRING(100)
    }
  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '신고기록',
    underscored: true,
  });
  Report.associate = (db) => {
    db.Reports.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Reports.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'id' });
  };
  return Report;
};




