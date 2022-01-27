module.exports = (sequelize, Sequelize) => {
    const Board = sequelize.define(
        "board",
        {
            board_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            writer: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            like: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            hate: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        },
        {
            timestamps: true,
        },
    );
    return Board;
};
// 제목 / 닉네임 / 내용 / 비밀번호 / 이미지파일(option)
