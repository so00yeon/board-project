"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes,
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Board = require("./Board")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);

db.User.hasMany(db.Board, { foreignKey: "user_id", sourceKey: "user_id" });
db.Board.belongsTo(db.User, { foreignKey: "user_id", targetKey: "user_id" });

db.User.belongsToMany(db.Board, {
    through: "User_Likes",
    foreignKey: "user_id",
});
db.Board.belongsToMany(db.User, {
    through: "User_Likes",
    foreignKey: "board_id",
});
db.User.belongsToMany(db.Board, {
    through: "User_Hates",
    foreignKey: "user_id",
});
db.Board.belongsToMany(db.User, {
    through: "User_Hates",
    foreignKey: "board_id",
});

db.Board.hasMany(db.Comment, { foreignKey: "board_id", sourceKey: "board_id" });
db.Comment.belongsTo(db.Board, {
    foreignKey: "board_id",
    targetKey: "board_id",
});

module.exports = db;
