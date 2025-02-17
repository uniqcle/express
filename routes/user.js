const express = require("express"),
  router = express.Router();

const { ObjectId } = require("mongodb");

const { Connection } = require("../ext/connection");

const collection = "users";

Connection.connectToMongo();

/////////////////////////////////////////
// Listing данных
/////////////////////////////////////////
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
  .get(async (req, res) => {
    const id = req.params.id;

    let content = {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      _id: id,
    };

    if (req.params.id !== "create") {
      try {
        content = await Connection.db
          .collection(collection)
          .findOne({ _id: new ObjectId(id) });

        console.log(content);
      } catch (err) {
        throw err;
      }
    }

    res.render("pages/user", {
      title: "Update Page",
      content,
    });
  })
  /////////////////////////////////////////
  // Добавление данных
  /////////////////////////////////////////
  .post(async (req, res) => {
    const result = await Connection.db
      .collection(collection)
      .insertOne(req.body);

    res.redirect("/users");
  })
  /////////////////////////////////////////
  // Обновление данных
  /////////////////////////////////////////
  .put(async (req, res) => {
    const id = req.params.id;

    console.log("Идет перезапись в БД: ", id);

    const result = await Connection.db
      .collection(collection)
      .findOneAndReplace({ _id: new ObjectId(id) }, req.body);
    console.log(result);

    await res.json({ message: "Данные обновлены" });
  })
  /////////////////////////////////////////
  // Удаление данных
  /////////////////////////////////////////
  .delete(async (req, res) => {
    const id = req.params.id;

    const result = await Connection.db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    await res.json({ message: "Пользователь удален" });
  });

module.exports = router;
