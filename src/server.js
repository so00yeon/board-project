import express from "express";
import morgan from "morgan";
import db from "../models";
import "dotenv/config";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import boardRouter from "./routers/boardRouter";
import userRouter from "./routers/userRouter";
import { localsMiddelware } from "./middleware";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
// app.set("view engine", "pug");
// app.set("views", process.cwd() + "/src/views");
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use(logger);

app.use(express.urlencoded({ extended: true })); // req.body....
app.use(express.json());
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
    }),
);

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});

app.use(localsMiddelware);
app.use("/", rootRouter);
app.use("/boards", boardRouter);
app.use("/users", userRouter);

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log("✅ Connected to DB");
    })
    .catch((err) => {
        console.error("❌ DB Error", err);
    });

const handleListening = () =>
    console.log(`✅ Server listening on port http:localhost:${PORT}`);

app.listen(PORT, handleListening);
