const pool = require("../db");
const Recipe = require("../entities/Recipe");

const RecipeModel = {
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

  async findRecipes(limit = 5, offset = 0) {
    const [rows] = await pool.query(
      "SELECT * FROM recipes ORDER BY createdAt DESC LIMIT ? OFFSET ?",
      [limit, offset]
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

  async findByCategory(category) {
    const [rows] = await pool.query(
      "SELECT * FROM recipes WHERE category = ? ORDER BY createdAt DESC",
      [category]
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

  async search(term) {
    const searchTerm = `%${term}%`;

    const [rows] = await pool.query(
      `SELECT * FROM recipes 
     WHERE title LIKE ? 
     OR JSON_SEARCH(ingredients, 'all', ?) IS NOT NULL
     ORDER BY createdAt DESC`,
      [searchTerm, term]
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
};

module.exports = RecipeModel;
