const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

module.exports = {
  sign: (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }),
  verify: (token) => {
		const decoded = jwt.verify(token, SECRET_KEY);
		return decoded
	},
};

