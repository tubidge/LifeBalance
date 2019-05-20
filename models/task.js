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

        Task.belongsTo(/*models.User,*/ models.Selection, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};