module.exports = (sequelize, Sequelize) => {
  const HowDoYouThink = sequelize.define('HowDoYouThink', {
      brief_explanation: {
        type: Sequelize.STRING(),
        allowNull: false
      },

      bamboo_number: {    // "# 번째 게시물" 할때 쓰임
        type: Sequelize.INTEGER()
      },

      gomin_type: {    // gomin type has to be classified, in order to be represented by a number.
        type: Sequelize.INTEGER()
      }

    },

    {
      timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
      paranoid: true,   // Sequelize adds attribute deletedAt to model.
      comment: '서로의생각이궁금해',
      underscored: true,
    });
  HowDoYouThink.associate = (db) => {
    db.HowDoYouThink.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id' });
  };
  return HowDoYouThink;
};


