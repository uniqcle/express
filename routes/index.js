const express = require("express"),
	router = express.Router(); 

  const config = require("../config/index");

  router.get("/", (req, res) => {
    // res.send("search: " + req.query.search);

    res.render("pages/index", {
      title: "Home page Express",
      siteName: config.siteName,
    });
  });

router.post("/", (req, res) => {
  res.send("POST method");
});

router.get("/pricing", (req, res) => {
  res.render("pages/pricing", {
    compare_plans: true,
  });
});



router.get("/checkout", (req, res) => {
  res.render("pages/checkout", {
    title: "Checkout page...",
  });
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