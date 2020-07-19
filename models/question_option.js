module.exports = (sequelize, Sequelize) => {
  const QuestionOption = sequelize.define('QuestionOption', {

    order: {  // order of this question_option in question
      type: Sequelize.INTEGER()
    },

    option: {
      type: Sequelize.STRING()
    },

    number_of_people_chose:{    // 통계 내기 위해서
      type: Sequelize.INTEGER()
    }

  }, {
    comment: '서로의생각이궁금해 질문의 옵션',
    underscored: true,
  });
  QuestionOption.associate = (db) => {
    db.QuestionOption.belongsTo(db.How_Do_You_Think, {foreignKey:'hdyt_id', targetKey:'uuid'});
    db.QuestionOption.belongsTo(db.Question, {foreignKey:'question_order', targetKey:'order'});
  };
  return QuestionOption;
};


