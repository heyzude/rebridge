module.exports = (sequelize, Sequelize) => {
  const Class = sequelize.define('Class', {
    introduction: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    curriculum: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    schedule: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    profilePhoto: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    classPhoto: {
      type: Sequelize.STRING(300),
      allowNull: false,
    }
  }, {
    timestamp: true,  // By default, Sequelize will add the attributes createdAt and updatedAt to your model
    paranoid: true,   // Sequelize adds attribute deletedAt to model.
    comment: '클래스',
  });
  Class.associate = (db) => {
    db.Class.belongsTo(db.User, { foreignKey: 'TutorId', targetKey: 'id' });
    db.Class.belongsToMany(db.User, { through: 'ClassAttendants' });
  };
  return Class;
};
