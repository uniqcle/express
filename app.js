const express = require("express"),
  morgan = require("morgan"),
  path = require("path");

const app = express();
const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "static")));

app.listen(3004, () => console.log("server running...3004"));
