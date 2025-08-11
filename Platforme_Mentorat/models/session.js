module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    mentorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    menteeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "completed", "cancelled"),
      defaultValue: "pending",
    },
  });

  Session.associate = (models) => {
    Session.belongsTo(models.User, {
      as: "Mentor",
      foreignKey: "mentorId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Session.belongsTo(models.User, {
      as: "Mentee",
      foreignKey: "menteeId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    Session.hasMany(models.Message, {
      foreignKey: "sessionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Session;
};
