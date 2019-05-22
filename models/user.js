module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    User: DataTypes.STRING
  });

  User.associate = function (models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Task, {
      onDelete: "cascade"
    });

  };

  return User;
};