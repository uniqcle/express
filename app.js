const express = require("express");

app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!!!");
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


app.listen(3000, () => console.log("server running...3000"));
