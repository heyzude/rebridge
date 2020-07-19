module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define('Question', {

    order: {  // order of this question in how_do_you_think
      type: Sequelize.INTEGER()
    },

    question: {
      type: Sequelize.STRING()
    },

  }, {
    comment: '서로의생각이궁금해 질문',
    underscored: true,
  });
  Question.associate = (db) => {
    db.Question.belongsTo(db.HowDoYouThink, { foreignKey: 'hdyt_id', targetKey: 'id' });
  };
  return Question;
};


