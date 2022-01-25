import db from "../../models";
import multer from "multer";
import Board from "../../models/Board";

export const home = async (req, res) => {
    const boards = await db.Board.findAll({});
    return res.render("home", { pageTitle: "Home", boards });
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
    const { title, content, writer, password } = req.body;
    const path = null;
    let user_id = null;
    if (req.file) {
        path = req.file.path;
    }
    if (req.session.user) {
        user_id = req.session.user.user_id;
    }
    try {
        await db.Board.create({
            title,
            content,
            writer,
            password,
            path,
            user_id,
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            pageTitle: "Upload Board",
            errorMessage: error._message,
        });
    }
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (board === null) {
        return res.render("404", { pageTitle: "Board not found." });
    }
    return res.render("watch", {
        pageTitle: board.title,
        board,
        errorMessage: "",
    });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (!board) {
        return res.render("404", { pageTitle: "Board not found." });
    }
    return res.render("edit", { pageTitle: `Edit: ${board.title}`, board });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, content, file } = req.body;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (!board) {
        return res.render("404", { pageTitle: "Board not found." });
    }
    if (!req.file.path) {
        await db.Board.update({ title, content }, { where: { board_id: id } });
    } else {
        await db.Board.update(
            { title, content, path: req.file.path },
            { where: { board_id: id } },
        );
    }
    return res.redirect(`/boards/${id}`);
};

export const deleteboard = async (req, res) => {
    const { id } = req.params;
    await db.Board.destroy({ where: { board_id: id } });
    return res.redirect("/");
};

// 랜더링 없이 api 방식으로 백엔드 처리
export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404); // status()는 render()하기 전에 상태코드를 정할 수 있는 코드이고, sendStatus()는 상태코드를 보내고 연결을 끝냄
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};
