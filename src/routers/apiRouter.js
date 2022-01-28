import express from "express";
import {
    likeUpdown,
    hateUpdown,
    dateSort,
    likeSort,
    hateSort,
} from "../controllers/boardController";

const apiRouter = express.Router();

apiRouter.post("/:TorF(\\d+)/date", dateSort);
apiRouter.post("/:TorF(\\d+)/like", likeSort);
apiRouter.post("/:TorF(\\d+)/hate", hateSort);
//apiRouter.post("/boards/:id(\\d+)/comment", createComment);
apiRouter.post("/boards/:id(\\d+)/like", likeUpdown);
apiRouter.post("/boards/:id(\\d+)/hate", hateUpdown);

export default apiRouter;
