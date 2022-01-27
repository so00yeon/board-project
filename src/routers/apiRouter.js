import express from "express";
import { dateSort } from "../controllers/boardController";

const apiRouter = express.Router();

// apiRouter.all("/boards/:id(\\d+)/view").get(colorChange);
//apiRouter.get("/boards/:id(\\d+)/like", likeUpdown);
apiRouter.post("/boards/date", dateSort);
//apiRouter.post("/boards/:id(\\d+)/comment", createComment);

export default apiRouter;
