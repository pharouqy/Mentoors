module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "mentor", "mentee"),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Session, {
      as: "MentorSessions",
      foreignKey: "mentorId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Session, {
      as: "MenteeSessions",
      foreignKey: "menteeId",
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Message, {
      foreignKey: "senderId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return User;
};
