const { UserModel } = require("../models/userModel");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const userData = await UserModel.findOne({ username });

  if (!userData) {
    res.status(401).send("Invalid credentials");
    return;
  }

  if (password !== userData.password) {
    res.status(401).send("Invalid credentials");
    return;
  }

  req.user = userData;
  next();
};

module.exports = {
  authentication,
};