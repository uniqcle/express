const express = require("express"),
	router = express.Router(); 


router.get("/", (req, res) => {
  console.log(req.query);
  res.send("search: " + req.query.search);
});

router.post("/", (req, res) => {
  res.send("POST method");
});


router.post("/login", (req, res) => {
  console.log(req.body);

  const users = [
    { login: "mike", password: "12345" },
    {
      login: "eduard",
      password: "12345",
    },
  ];

  let user = users.find((user) => {
    return user.login === req.body.login && user.password === req.body.password;
  });

  if (user) {
    res.json({ message: "login" });
  } else {
    res.status(400).json({ message: "incorrect login or password" });
  }
});

module.exports = router; 