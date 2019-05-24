module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 255]
      }
    },
  });
  Task.associate = function (models) {

    Task.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Task.belongsTo(models.Selection, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};