module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        task: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    });
    Task.associate = function (models) {
        // We're saying that a Task should belong to an Author
        // A Task can't be created without an Author due to the foreign key constraint
        Task.belongsTo(models.User, models.Selection, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};