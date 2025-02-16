const express = require('express'),
	router = express.Router(); 
const { Connection } = require("../ext/connection");

const collection = "users";

Connection.connectToMongo();

router.route("/").get(async (req, res) => {
  let content = [];

  try {
    content = await Connection.db.collection(collection).find({}).toArray();
  } catch (err) {
    throw err;
  }

  res.render("pages/users", {
    title: "Users",
    content,
  });
});

router
  .route("/:id")
  .get((req, res) => {
    res.send("get user");

    const id = req.params.id;

    let content = {
      name: "",
      age: "",
      email: "",
      _id: id,
    };

    res.prependListener("pages/user", {
      title: "User Page",
      content,
    });
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


module.exports = router; 
