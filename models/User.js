const db = require("../config/db");

const insertUser = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO user(
          email,
          password,
          is_exist
        ) values (?, ?, ?) 
      `,
      [data.email, data.password, true],
      function (err) {
        if (err) reject(`Error inserting user into database: ${err}`);

        db.get('SELECT * FROM user WHERE id = ?', [this.lastID], function(err, user) {
          if (err) reject(`Error retrieving inserted user: ${err}`);

          resolve(user)
        })
      }
    );
  })
};
module.exports = { insertUser };
