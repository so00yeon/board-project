import express from "express";
import {
    likeUpdown,
    hateUpdown,
    watch,
    deleteboard,
    getUpload,
    postUpload,
    getEdit,
    postEdit,
} from "../controllers/boardController";
import { pictureUpload } from "../middleware";

const boardRouter = express.Router();

boardRouter
    .route("/upload")
    .get(getUpload)
    .post(pictureUpload.single("file"), postUpload);
boardRouter.get("/:id(\\d+)", watch);
boardRouter
    .route("/:id(\\d+)/edit")
    .get(getEdit)
    .post(pictureUpload.single("file"), postEdit);
boardRouter.get("/:id(\\d+)/delete", deleteboard);
boardRouter.get("/:id(\\d+)/like", likeUpdown);
boardRouter.get("/:id(\\d+)/hate", hateUpdown);

export default boardRouter;
