const router = require("express").Router();
const { insertUser } = require("../controllers/user");

router.post("/user", insertUser);

module.exports = router;
