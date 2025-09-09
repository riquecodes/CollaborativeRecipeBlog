const pool = require("../db");
const Recipe = require("../entities/recipe");

const recipeModel = {
  async create({ title, ingredients, instructions, author, category }) {
    const [result] = await pool.query(
      `INSERT INTO recipes (title, ingredients, instructions, author, category)
       VALUES (?, ?, ?, ?, ?)`,
      [title, JSON.stringify(ingredients), instructions, author, category]
    );

    return new Recipe({
      id: result.insertId,
      title,
      ingredients,
      instructions,
      author,
      category,
    });
  },

  async findAll() {
    const [rows] = await pool.query(
      "SELECT * FROM recipes ORDER BY createdAt DESC"
    );
    return rows.map(
      (r) =>
        new Recipe({
          id: r.id,
          title: r.title,
          ingredients: JSON.parse(r.ingredients),
          instructions: r.instructions,
          author: r.author,
          category: r.category,
          createdAt: r.createdAt,
        })
    );
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM recipes WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Recipe({
      id: r.id,
      title: r.title,
      ingredients: JSON.parse(r.ingredients),
      instructions: r.instructions,
      author: r.author,
      category: r.category,
      createdAt: r.createdAt,
    });
  },

  async findRecipesWithPagination(limit = 6, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM recipes ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM recipes 
       WHERE category = ?`,
      [category]
    );

    const recipes = rows.map(
      (r) =>
        new Recipe({
          id: r.id,
          title: r.title,
          ingredients: JSON.parse(r.ingredients),
          instructions: r.instructions,
          author: r.author,
          category: r.category,
          createdAt: r.createdAt,
        })
    );

    return { recipes, total }
  },

  async findByCategoryWithPagination(category, limit = 6, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM recipes WHERE category = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [category, limit, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM recipes 
       WHERE category = ?`,
      [category]
    );

    const recipes = rows.map(
      (r) =>
        new Recipe({
          id: r.id,
          title: r.title,
          ingredients: JSON.parse(r.ingredients),
          instructions: r.instructions,
          author: r.author,
          category: r.category,
          createdAt: r.createdAt,
        })
    );

    return { recipes, total }
  },

  async searchWithPagination(term, limit = 6, offset = 0) {
    const searchTerm = `%${term}%`;

    const [rows] = await pool.query(
     `SELECT * FROM recipes 
     WHERE title LIKE ?
     OR JSON_SEARCH(ingredients, 'all', ?) IS NOT NULL
     ORDER BY createdAt DESC LIMIT = ? OFFSET = ?`,
      [searchTerm, term, limit, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM recipes 
       WHERE title LIKE ? 
       OR JSON_SEARCH(ingredients, 'all', ?) IS NOT NULL`,
      [searchTerm, term]
    );

    const recipes = rows.map(
      (r) =>
        new Recipe({
          id: r.id,
          title: r.title,
          ingredients: JSON.parse(r.ingredients),
          instructions: r.instructions,
          author: r.author,
          category: r.category,
          createdAt: r.createdAt,
        })
    );

    return { recipes, total };
  },
};

module.exports = recipeModel;
