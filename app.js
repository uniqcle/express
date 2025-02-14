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


app.listen(3000, () => console.log("server running...3000"));
