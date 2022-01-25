import express from "express";
import { getEdit, postEdit, logout, see } from "../controllers/userController";
import { protectorMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get(":id", see);

export default userRouter;
