module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "user",
        {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    );

    return User;
};
