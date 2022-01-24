import db from "../../models";
import multer from "multer";
import Board from "../../models/Board";

// export const home = (req, res) => {
//     db.Board.findAll({})
//         .then((boards) => {
//             res.render("home", { pageTitle: "Home", boards });
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// };
export const home = async (req, res) => {
    const boards = await db.Board.findAll({});
    return res.render("home", { pageTitle: "Home", boards });
};

// export const upload = (req, res) =>
//     res.render("upload", { pageTitle: "Upload" });

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
    const { title, content, writer, password } = req.body;
    try {
        await db.Board.create({
            title,
            content,
            writer,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

// export const watch = (req, res) => {
//     return res.send(`Watch #${req.params.id}`);
// };
export const getWatch = async (req, res) => {
    const { id } = req.params;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (board === null) {
        return res.render("404", { pageTitle: "Board not found." });
    }
    console.log(req.session.user);
    return res.render("watch", {
        pageTitle: board.title,
        board,
        errorMessage: "",
    });
};

export const postWatch = async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (board.password != password) {
        return res.render("watch", {
            pageTitle: board.title,
            board,
            errorMessage: "Wrong password :(",
        });
    }
    return res.render("edit", { pageTitle: "Edit & Delete", board });
};

export const search = (req, res) => res.send("Search");
export const deleteboard = (req, res) => {
    return res.send(`Delete board #${req.params.id}`);
};
