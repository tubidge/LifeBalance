
module.exports = function (sequelize, DataTypes) {
  var Selection = sequelize.define("Selection", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
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
