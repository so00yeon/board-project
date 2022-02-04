import db from "../../models";

export const home = async (req, res) => {
    const boards = await db.Board.findAll({});
    return res.render("home", { pageTitle: "Home", boards });
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
    const { title, content, writer, password } = req.body;
    let path = null;
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
        include: [{ model: db.Comment }],
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
    const { title, content } = req.body;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (!board) {
        return res.render("404", { pageTitle: "Board not found." });
    }
    let path = null;
    if (req.file) {
        path = req.file.path;
        await db.Board.update(
            { title, content, path },
            { where: { board_id: id } },
        );
    } else {
        await db.Board.update({ title, content }, { where: { board_id: id } });
    }
    return res.redirect(`/boards/${id}`);
};

export const deleteboard = async (req, res) => {
    const { id } = req.params;
    await db.Board.destroy({ where: { board_id: id } });
    return res.redirect("/");
};

export const likeUpdown = async (req, res) => {
    const { id } = req.params;
    const likeExists = await db.sequelize.models.User_Likes.findOne({
        where: {
            user_id: req.session.user.user_id,
            board_id: id,
        },
    });
    if (likeExists) {
        await db.sequelize.models.User_Likes.destroy({
            where: { board_id: id },
        });
        await db.Board.decrement(["like"], { where: { board_id: id } });
    } else {
        await db.sequelize.models.User_Likes.create({
            user_id: req.session.user.user_id,
            board_id: id,
        });
        await db.Board.increment(["like"], { where: { board_id: id } });
    }
    let result = await db.Board.findOne({
        attributes: ["like"],
        where: {
            board_id: id,
        },
    });
    return res.send(result);
};

export const hateUpdown = async (req, res) => {
    const { id } = req.params;
    const hateExists = await db.sequelize.models.User_Hates.findOne({
        where: {
            user_id: req.session.user.user_id,
            board_id: id,
        },
    });
    if (hateExists) {
        await db.sequelize.models.User_Hates.destroy({
            where: { board_id: id },
        });
        await db.Board.decrement(["hate"], { where: { board_id: id } });
    } else {
        await db.sequelize.models.User_Hates.create({
            user_id: req.session.user.user_id,
            board_id: id,
        });
        await db.Board.increment(["hate"], { where: { board_id: id } });
    }
    let result = await db.Board.findOne({
        attributes: ["hate"],
        where: {
            board_id: id,
        },
    });
    return res.send(result);
};

export const dateSort = async (req, res) => {
    let TorF = req.params.TorF;
    let boards = null;
    if (TorF == 0) {
        boards = await db.Board.findAll({
            order: [["createdAt", "DESC"]],
        });
        TorF = 1;
    } else {
        boards = await db.Board.findAll({
            order: [["createdAt", "ASC"]],
        });
        TorF = 0;
    }
    return res.send({ boards, TorF });
};

export const likeSort = async (req, res) => {
    let TorF = req.params.TorF;
    let boards = null;
    if (TorF == 0) {
        boards = await db.Board.findAll({
            order: [["like", "DESC"]],
        });
        TorF = 1;
    } else {
        boards = await db.Board.findAll({
            order: [["like", "ASC"]],
        });
        TorF = 0;
    }
    return res.send({ boards, TorF });
};

export const hateSort = async (req, res) => {
    let TorF = req.params.TorF;
    let boards = null;
    if (TorF == 0) {
        boards = await db.Board.findAll({
            order: [["hate", "DESC"]],
        });
        TorF = 1;
    } else {
        boards = await db.Board.findAll({
            order: [["hate", "ASC"]],
        });
        TorF = 0;
    }
    return res.send({ boards, TorF });
};

export const hateSortOnly = async (req, res) => {
    let boards = null;
    boards = await db.Board.findAll({
        order: [["hate", "DESC"]],
    });
    return res.send({ boards });
};

export const likeSortOnly = async (req, res) => {
    let boards = null;
    boards = await db.Board.findAll({
        order: [["like", "DESC"]],
    });
    return res.send({ boards });
};

export const dateSortOnly = async (req, res) => {
    let boards = null;
    boards = await db.Board.findAll({
        order: [["createdAt", "DESC"]],
    });
    return res.send({ boards });
};

export const createComment = async (req, res) => {
    const {
        session: { user },
        body: { text },
        params: { id },
    } = req;
    const board = await db.Board.findOne({
        where: {
            board_id: id,
        },
    });
    if (!board) {
        return res.sendStatus(404);
    }
    const comment = await db.Comment.create({
        text,
        user_id: user.user_id,
        board_id: id,
    });
    return res.status(201).json({ newCommentId: comment.comment_id }); // 201은 create, 댓글의 id를 보내준다.
};

export const removeComment = async (req, res) => {
    const { id } = req.params;
    await db.Comment.destroy({
        where: {
            comment_id: id,
        },
    });
    return res.status(201);
};
