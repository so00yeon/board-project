import express from "express";
import morgan from "morgan";
import db from "../models";
import "dotenv/config";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import cookieParser from "cookie-parser";
import rootRouter from "./routers/rootRouter";
import boardRouter from "./routers/boardRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddelware } from "./middleware";

const PORT = 4000;
var options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qkrth963",
    database: "boardProject",
};

const app = express();
const logger = morgan("dev");
const sessionStore = new MySQLStore(options);

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use("/uploads", express.static("uploads"));
// 앞에는 url, 뒤에는 폴더 이름

app.use(logger);
app.use(express.urlencoded({ extended: true })); // req.body....
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(
    session({
        key: "session_cookie_name",
        secret: process.env.COOKIE_SECRET,
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(localsMiddelware);
app.use("/", rootRouter);
app.use("/boards", boardRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

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
