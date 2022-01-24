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
        },
        {
            timestamps: false,
        },
    );

    return Board;
};
// 제목 / 닉네임 / 내용 / 비밀번호 / 이미지파일(option)
