
module.exports = function (sequelize, DataTypes) {
  var Selection = sequelize.define("Selection", {
    education: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    family: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    finances: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hobbies: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    healthiness: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    home: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    social: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    work: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
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
