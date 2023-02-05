const db = require("../config/db");

const insertPost = (data) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO post(
        title,
        content,
        author
      ) values (?, ?, ?)
    `,
      [data.title, data.content, data.author],
      function (err) {
        if (err) reject(`Error inserting post into database: ${err}`);

        db.get(
          "SELECT * FROM post WHERE id = ?",
          [this.lastID],
          function (err, post) {
            if (err) reject(`Error retrieving inserted post: ${err}`);

            resolve(post);
          }
        );
      }
    );
  });
};

const getAllPosts = (query) => {
  return new Promise((resolve, reject) => {
    const pageSize = parseInt(query.size) || 10;
    const pageNum = parseInt(query.num) || 1;

    db.all(
      `SELECT * FROM post LIMIT ${pageSize} OFFSET ${pageNum}`,
      function (err, posts) {
        if (err) reject(`Error getting all posts: ${err}`);

        db.get("SELECT count(id) FROM post", function (err, count) {
          if (err) reject(`Error getting counts of posts: ${err}`);

          resolve({ posts, count: count["count(id)"] });
        });
      }
    );
  });
};

const getPost = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM post WHERE id = ?`,
      [id],
      function (err, post) {
        if (err) reject(`Error getting post: ${err}`);

        resolve(post)
      }
    );
  });
};

module.exports = { insertPost, getAllPosts, getPost };
