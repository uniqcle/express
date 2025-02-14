const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log(req.query);
  res.send("search: " + req.query.search);
});

app.post("/", (req, res) => {
  res.send("POST method");
});

app.get("/catalog/:id/section/:part", (req, res) => {
  const info = "catalog: " + req.params.id + " section: " + req.params.part;
  res.send(info);
});

app
  .route("/user")
  .get((req, res) => {
    res.send("get user");
  })
  .post((req, res) => {
    res.send("create user");
  })
  .put((req, res) => {
    res.send("update user");
  })
  .delete((req, res) => {
    res.send("delete user");
  });

app.listen(3005, () => console.log("server running...3005"));
