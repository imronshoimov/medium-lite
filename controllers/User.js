const userModel = require("../models/User");
const code = require("../config/status");
const { sign } =require("../lib/jwt")

const insertUser = async (req, res) => {
  const key = ["email", "password"];

  for (let item of key) {
    if (!req.body[item]) {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: `${item} is required`,
      });
    }
  }

  userModel.insertUser(req.body)
    .then(user => {
      const token = sign({ user: user.id })
      res.status(201).send({ token });
    })
    .catch(err => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
}

module.exports = { insertUser };
