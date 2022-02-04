import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const s3ImageUploader = multerS3({
    s3: s3,
    bucket: "sosoboboard/boardImages",
    acl: "public-read",
});

const s3avatarUploader = multerS3({
    s3: s3,
    bucket: "sosoboboard/avatarImages",
    acl: "public-read",
});

export const localsMiddelware = (req, res, next) => {
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
    storage: s3ImageUploader,
});

export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
    storage: s3avatarUploader,
});
