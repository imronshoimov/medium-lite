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

        db.get(
          "SELECT * FROM user WHERE id = ?",
          [this.lastID],
          function (err, user) {
            if (err) reject(`Error retrieving inserted user: ${err}`);

            resolve(user);
          }
        );
      }
    );
  });
};

const getUser = (data) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
        SELECT 
          email, 
          password 
        FROM user 
        WHERE email = ? 
        AND is_exist = true
      `,
      [data.email],
      function (err, user) {
        if (err) reject(`Error inserting user into database: ${err}`);

        resolve(user);
      }
    );
  });
};

const getAllUsers = (query) => {
  return new Promise((resolve, reject) => {
    const pageSize = parseInt(query.size) || 10;
    const pageNum = parseInt(query.num) || 1;

    db.all(
      `
        SELECT 
          user.email,
          user.password,
          post.title,
          post.content
        FROM user
        INNER JOIN post
        ON user.id = post.author
        LIMIT ${pageSize} OFFSET ${pageNum}`,
      function (err, users) {
        if (err) reject(`Error getting all users: ${err}`);

        db.get("SELECT count(id) FROM user", function (err, count) {
          if (err) reject(`Error getting counts of posts: ${err}`);

          resolve({ users, count: count["count(id)"] });
        });
      }
    );
  });
};

module.exports = { insertUser, getUser, getAllUsers };
