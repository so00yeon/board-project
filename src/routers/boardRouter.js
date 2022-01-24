import express from "express";
import {
    getWatch,
    postWatch,
    edit,
    deleteboard,
    getUpload,
    postUpload,
    getEdit,
    postEdit,
} from "../controllers/boardController";

const boardRouter = express.Router();

//boardRouter.get("/upload", upload);
boardRouter.route("/upload").get(getUpload).post(postUpload);
boardRouter.route("/:id(\\d+)").get(getWatch).post(postWatch);
//boardRouter.route("/:id((\\d+)/edit").get(getEdit).post(postEdit);
boardRouter.get("/:id/delete", deleteboard);

export default boardRouter;
