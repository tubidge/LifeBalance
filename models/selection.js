
module.exports = function (sequelize, DataTypes) {
  var Selection = sequelize.define("Selection", {
    UserSelection: {
      type: DataTypes.STRING,
      allowNull: false,

    },

  });

  Selection.associate = function (models) {
    // We're saying that a Selection should belong to an Author
    // A Selection can't be created without an Author due to the foreign key constraint
    Selection.hasMany(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Selection;
};
