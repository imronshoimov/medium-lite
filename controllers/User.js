const userModel = require("../models/user");
const code = require("../config/status");
const { sign } = require("../lib/jwt");

const registerUser = async (req, res) => {
  const key = ["email", "password"];

  for (let item of key) {
    if (!req.body[item]) {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: `${item} is required`,
      });
    }
  }

  userModel
    .insertUser(req.body)
    .then((user) => {
      const token = sign({ id: user.id, email: user.email });
      res.status(201).send({ token });
    })
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

const loginUser = async (req, res) => {
  const key = ["email", "password"];

  for (let item of key) {
    if (!req.body[item]) {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: `${item} is required`,
      });
    }
  }

  userModel
    .getUser(req.body)
    .then((user) => {
      if (user.password == req.body.password) {
        const token = sign({ id: user.id, email: user.email });
        res.status(201).send({ token });
      }
    })
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

const getAllUsers = async (req, res) => {
  userModel
    .getAllUsers(req.query)
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

module.exports = { registerUser, loginUser, getAllUsers };
