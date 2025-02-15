const express = require("express"),
  morgan = require("morgan"),
  path = require("path");

const app = express();
const indexPage = require("./routes/index");
const catalogPage = require("./routes/catalog");
const userPage = require("./routes/user");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "static")));

console.log(__dirname);

app.use("/", indexPage);
app.use("/catalog", catalogPage);
app.use("/user", userPage);
 

app.listen(3005, () => console.log("server running...3005"));
