module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Session, { foreignKey: 'sessionId' });
    Message.belongsTo(models.User, { foreignKey: 'senderId' });
  };

  return Message;
};
