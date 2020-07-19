module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define('Notification', {

  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '알림',
    underscored: true,
  });
  Notification.associate = (db) => {};
  return Notification;
};
