const router = require("express").Router();
const checkUser = require("../middlewares/checkUser")
const { insertPost, getAllPosts, getPost } = require("../controllers/post");

router.post("/post", checkUser, insertPost);
router.get("/posts", checkUser, getAllPosts)
router.get("/post/:id", checkUser, getPost)

module.exports = router;