require("dotenv").config();

const express = require("express"),
  morgan = require("morgan"),
  path = require("path");

const app = express();
const port = process.env.PORT || 3005;

const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan(process.env.LOG_LEVEL));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "static")));

app.listen(port, () => console.log("server running..." + port));
