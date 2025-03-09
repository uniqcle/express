require("dotenv").config();

const express = require("express"),
  morgan = require("morgan"),
  path = require("path");
const mongoSanitize = require("express-mongo-sanitize");

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
app.use(mongoSanitize());

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/users", userRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "static")));


// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  // if (err instanceof mongoose.Error.ValidationError) {
  //   return res.status(400).json({ error: 'Ошибка валидации', details: err.errors });
  // }
  // if (err.name === 'MongoServerError' && err.code === 11000) {
  //   return res.status(400).json({ error: 'Нарушение уникальности', details: err.keyValue });
  // }
  // return res.status(500).json({ error: 'Внутренняя ошибка сервера', message: err.message });

  res.status(500).send('Что-то сломалось!')
});


app.listen(port, () => console.log("server running..." + port));
