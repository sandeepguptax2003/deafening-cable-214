const express = require("express");
const { UserModel } = require("../models/userModel");
const userRoute = express.Router();
const bcrypt = require("bcrypt");

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const database = await UserModel.find({ email });
    if (database.length > 0) {
      res.status(400).json({ message: "User already exists" });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          res.status(401).send({ error: err.message });
        } else {
          const user = new UserModel({ name, email, password: hash });
          await user.save();
          res.status(200).send({ msg: "user created successful" });
        }
      });
    }
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.status(200).json({ success: "login successful" });
      } else {
        res.status(401).json({ err: "wrong credential" });
      }
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = { userRoute };