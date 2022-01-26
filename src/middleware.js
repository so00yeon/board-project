import multer from "multer";

export const localsMiddelware = (req, res, next) => {
    console.log(req.session.user);
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "BoardProject";
    res.locals.loggedInUser = req.session.user;
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};

export const pictureUpload = multer({
    dest: "uploads/pictuers/",
    limits: {
        fileSize: 3000000,
    },
});

export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
});
