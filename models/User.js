const db = require("../config/db");
const code = require("../config/status");

const insertUser = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO user(
          email,
          password,
          is_exist
        ) values (?, ?, ?) RETURNING id
      `,
      [data.email, data.password, true],
      function (err) {
        if (err) reject(`Error inserting user into database: ${err}`);
        resolve(this.lastID)
      }
    );
  })
};
module.exports = { insertUser };
