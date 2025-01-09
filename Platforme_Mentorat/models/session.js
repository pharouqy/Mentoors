module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menteeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'completed', 'cancelled'),
      defaultValue: 'pending'
    }
  });

  Session.associate = (models) => {
    Session.belongsTo(models.User, { as: 'Mentor', foreignKey: 'mentorId' });
    Session.belongsTo(models.User, { as: 'Mentee', foreignKey: 'menteeId' });
    Session.hasMany(models.Message, { foreignKey: 'sessionId' });
  };

  return Session;
};
