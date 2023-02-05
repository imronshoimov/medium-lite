const router = require("express").Router();
const { insertUser } = require("../controllers/User");

router.post("/user", insertUser);

module.exports = router;
