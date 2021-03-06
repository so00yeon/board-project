import express from "express";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
} from "../controllers/userController";
import { home } from "../controllers/boardController";
import { publicOnlyMiddleware, setHomeList } from "../middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
    .route("/login")
    .all(publicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);

export default rootRouter;
