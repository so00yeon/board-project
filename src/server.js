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
app.use("/static", express.static("src"));
// 앞에는 url, 뒤에는 폴더 이름

app.use(logger);
app.use(express.urlencoded({ extended: true })); // req.body....
//app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Origin",
        "https://sosoboard.herokuapp.com/",
    );
    next();
});
app.use(
    session({
        key: "session_cookie_name",
        secret: process.env.COOKIE_SECRET, // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
        store: sessionStore,
        resave: false, //세션 아이디를 접속할때마다 새롭게 발급하지 않음
        saveUninitialized: true, //세션 아이디를 실제 사용하기전에는 발급하지 않음
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
