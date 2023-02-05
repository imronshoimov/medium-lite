const router = require("express").Router();
const checkUser = require("../middlewares/checkUser")
const { registerUser, loginUser, getAllUsers } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", checkUser, getAllUsers)

module.exports = router;
