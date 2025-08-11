module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Session, {
      foreignKey: "sessionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Message.belongsTo(models.User, {
      foreignKey: "senderId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Message;
};
