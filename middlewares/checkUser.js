const db = require("../config/db");
const code = require("../config/status")
const { verify } = require("../lib/jwt");

const checkUser = (req, res, next) => {
	const token = req.headers['authorization']
	const verifiedToken = verify(token);

  db.get(
    `
      SELECT id, email, password
      FROM user WHERE id = ?
    `,
    [verifiedToken.id],
    (err, value) => {
      if (err) reject(`Error checking user: ${err}`);

			if(verifiedToken.email != value.email) {
				res.status(404).json({
					code: code.NOT_FOUND,
					message: "You are not registered, please register!",
				});
			} 
			next()
    }
  );
};

module.exports = checkUser;
