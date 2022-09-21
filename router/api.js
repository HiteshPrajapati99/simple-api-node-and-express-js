const express = require("express");
const routes = express.Router();
const scema = require("../Database/scema");

// post api

routes.post("/create", async (req, res) => {
  const { name, number, email, password } = req.body;

  if (!name || !number || !email || !password) {
    res.status(404).send("plz fill the data");
  }

  try {
    const preUser = await scema.findOne({ email: email });
    // console.log(preUser);

    if (preUser) {
      res.send("this user is allredy registerd");
    } else {
      const addUser = new scema({
        name,
        number,
        email,
        password,
      });
      addUser.save();
      res.send("user add success");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// get api

routes.get("/get", async function (req, res) {
  try {
    const userData = await scema.find();
    res.send(userData);
  } catch (error) {
    res.send(error);
  }
});

// delet api

routes.delete("/delet/:id", function (req, res) {
  scema.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: "No user found" });
    } else {
      res.send({
        success: true,
        message: "Your Account has been delete now !!!",
      });
    }
  });
});

// get data using id for edit

routes.get("/edit/get/:id", function (req, res) {
  scema.findOne({ _id: req.params.id }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "No user found" });
    } else {
      res.json({ success: true, user: user });
    }
  });
});

// edit api

routes.put("/edit/:id", function (req, res) {
  scema.findOne({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    if (!data) {
      res.json({ success: false, message: "No user found" });
    } else {
      data.name = req.body.name;
      data.number = req.body.number;
      data.email = req.body.email;
      data.password = req.body.password;
      data.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ success: true, message: "Details has been updated!" });
        }
      });
    }
  });
});

module.exports = routes;

// api urls

// post data url => "http://localhost:4000/create"
// get data url  => "http://localhost:4000/get"
// delet data url  =>  `http://localhost:4000/delet/${id}`
//  edit api data url => `http://localhost:4000/edit/${id}`
// get data using id => `http://localhost:4000/edit/${id}`
