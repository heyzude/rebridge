module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    loginId: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
      comment: '로그인 시 쓰이는 아이디',
    },
    password: {
      type: Sequelize.STRING(80),
      allowNull: false,
      comment: '비밀번호',
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '이름',
    },
    dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
      comment: '생년월일',
    },
    gender: {
      type: Sequelize.BOOLEAN, // 0: 남자, 1: 여자
      allowNull: true,
      comment: '성별',
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: false,
      comment: '휴대폰번호'
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    sns: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    snsId: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    // By default, Sequelize will add the attributes createdAt and updatedAt to your model
  }, {
    timestamps: true,
    paranoid: true,
    comment: '사용자',
  });

  User.associate = (db) => {
    db.User.belongsToMany(db.User, { through: 'Followings', as: 'Follower', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Followings', as: 'Following', foreignKey: 'followerId' });
    db.User.belongsToMany(db.Post, { through: 'Likes' }); // N:M relationship
    db.User.belongsToMany(db.Post, { through: 'Shares' }); // N:M relationship
    db.User.belongsToMany(db.Class, { through: 'ClassAttendants' }); // N:M relationship
  };
  return User;
};
