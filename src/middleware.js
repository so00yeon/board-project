import multer from "multer";

// export const avatarUpload = multer({
//     dest: "uploads/avatars/",
//     limits: {
//         fileSize: 3000000,
//     },
// });

export const localsMiddelware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "BoardProject";
    res.locals.loggedInUser = req.session.user;
    next();
};
