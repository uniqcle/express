const express = require("express"),
  router = express.Router();

// for mongodb
// const { ObjectId } = require("mongodb");
// const { Connection } = require("../ext/mongodb");
// const collection = "users";
// Connection.connectToMongo();

// for mongoose
const  User  = require('../models/User')

/////////////////////////////////////////
// Listing данных
/////////////////////////////////////////
router.route("/").get(async (req, res, next) => {
  let content = [];

  try {
    // for mongodb
    // content = await Connection.db.collection(collection).find({}).toArray();

    //for mongoose
    content = await User.find({});

  } catch (err) {
    return next(err);
  }

  res.render("pages/users", {
    title: "Users",
    content,
  });
});

router
  .route("/:id")
  .get(async (req, res, next) => {
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
        // for mongodb
        // content = await Connection.db.collection(collection).findOne({ _id: new ObjectId(id) });

        //for mongoose
        content = await User.findById(id).exec(); 
        let userUpperCase = await content.getNameInUpperCase(); 

      } catch (err) {
        return next(err);
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
  .post(async (req, res, next) => {

    //for mongodb
    // const result = await Connection.db.collection(collection).insertOne(req.body);

    try {
      //for mongoose
      let user = new User(req.body); 
      await user.save()
    } catch (err) {
      return next(err)
    }
    
    //res.redirect("/users");
  })
  /////////////////////////////////////////
  // Обновление данных
  /////////////////////////////////////////
  .put(async (req, res, next) => {
    const id = req.params.id;

     //for mongodb
    //  const result = await Connection.db.collection(collection).findOneAndReplace({ _id: new ObjectId(id) }, req.body);
    
    try {
      //for mongoose
      await User.findByIdAndUpdate(id, req.body, { runValidators: true });

      await res.json({ message: "Данные обновлены" });
    } catch (err) {
      return next(err)
    }

  })
  /////////////////////////////////////////
  // Удаление данных
  /////////////////////////////////////////
  .delete(async (req, res) => {
    const id = req.params.id;

    //for mongodb
    // const result = await Connection.db.collection(collection).deleteOne({ _id: new ObjectId(id) });

    try {

      await User.findByIdAndDelete(id)
      
      await res.json({ message: "Пользователь удален" });

    } catch (err) {
      return res.status(400).json({message: 'Произошла ошибка'})
    }

    
  });

module.exports = router;
