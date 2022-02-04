module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
        "comment",
        {
            comment_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
            },
            board_id: {
                type: Sequelize.INTEGER,
            },
            text: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
        },
        {
            timestamps: true,
        },
    );

    return Comment;
};
