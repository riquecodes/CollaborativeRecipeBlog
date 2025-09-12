//const pool = require("../db");
const Comment = require("../domain/comment");

const commentModel = {
  async create({ recipeId, author, content }) {
    const [result] = await pool.query(
      `INSERT INTO comments (recipeId, author, content)
        VALUES (?, ?, ?)`,
      [recipeId, author, content]
    );

    return new Comment({
      id: result.insertId,
      recipeId,
      author,
      content,
    });
  },

  async findByRecipeId(recipeId) {
    const [rows] = await pool.query(
      "SELECT * FROM comments WHERE recipeId = ? ORDER BY createdAt DESC",
      [recipeId]
    );
    return rows.map(
      (c) =>
        new Comment({
          id: c.id,
          recipeId: c.recipeId,
          author: c.author,
          content: c.content,
          createdAt: c.createdAt,
        })
    );
  },
};

module.exports = commentModel;