const postModel = require("../models/post");
const code = require("../config/status");

const insertPost = (req, res) => {
  const key = ["title", "content", "author"];

  for (let item of key) {
    if (!req.body[item]) {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: `${item} is required`,
      });
    }
  }

  postModel
    .insertPost(req.body)
    .then((post) => res.status(201).send(post))
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

const getAllPosts = (req, res) => {
  postModel
    .getAllPosts(req.query)
    .then((posts) => res.status(200).send(posts))
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

const getPost = (req, res) => {
  postModel
    .getPost(req.params.id)
    .then((post) => res.status(200).send(post))
    .catch((err) => {
      res.status(400).json({
        code: code.BAD_REQUEST,
        message: err.message,
      });
    });
};

module.exports = { insertPost, getAllPosts, getPost };
