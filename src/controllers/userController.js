import db from "../../models";
import multer from "multer";
import User from "../../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
    res.render("join", { pageTitle: "Join", errorMessage: "" });
export const postJoin = async (req, res) => {
    const { name, userName, password, password2 } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation dose not match.",
        });
    }
    const exists = await db.User.findOne({
        where: {
            userName: userName,
        },
    });
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This userName is already taken.",
        });
    }
    try {
        await db.User.create({
            name,
            userName,
            password: bcrypt.hashSync(password, 5),
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: error._message,
        });
    }
};

export const getLogin = (req, res) =>
    res.render("login", { pageTitle: "Login", errorMessage: "" });

export const postLogin = async (req, res) => {
    const { userName, password } = req.body;
    const user = await db.User.findOne({
        where: {
            userName: userName,
        },
    });
    const pageTitle = "Login";
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username dose not exists.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password.",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");
export const see = (req, res) => res.send("See");
