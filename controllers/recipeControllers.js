const recipeModel = require("../models/recipeModel");

const recipeController = {
  async index(req, res) {
    try {
      const { page = 1, search, category } = req.query;
      const limit = 6;
      const offset = (page - 1) * limit;

      if (search) {
        const { recipes, total } = await recipeModel.searchWithPagination(search, limit, offset);
        return res.json({
          data: recipes,
          pagination: {
            page: Number(page),
            perPage: limit,
            total,
          },
        });
      }

      if (category) {
        const { recipes, total } = await recipeModel.findByCategoryWithPagination(category, limit, offset);
        return res.json({
          data: recipes,
          pagination: {
            page: Number(page),
            perPage: limit,
            total,
          },
        });
      }

      const { recipes, total } = await recipeModel.findRecipesWithPagination(limit, offset);
      return res.json({
        data: recipes,
        pagination: {
          page: Number(page),
          perPage: limit,
          total,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao carregar as receitas." });
    }
  },
};

module.exports = recipeController;
