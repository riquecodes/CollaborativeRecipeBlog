const recipeModel = require("../models/recipeModel");

function sendPaginatedResponse(res, recipes, page, limit, total) {
  return res.json({
    data: recipes,
    pagination: {
      page: Number(page),
      perPage: limit,
      total,
    },
  });
}

const recipeController = {
  async create(req, res) {
    try {
      const { title, ingredients, instructions, author, category } = req.body;

      const newRecipe = await recipeModel.create({
        title,
        ingredients,
        instructions,
        author,
        category,
      });

      return res.status(201).json(newRecipe);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const { page = 1, search, category } = req.query;
      const limit = 6;
      const offset = (page - 1) * limit;

      if (search) {
        const { recipes, total } = await recipeModel.searchWithPagination(
          search,
          limit,
          offset
        );

        return sendPaginatedResponse(res, recipes, page, limit, total);
      }

      if (category) {
        const { recipes, total } =
          await recipeModel.findByCategoryWithPagination(
            category,
            limit,
            offset
          );

        return sendPaginatedResponse(res, recipes, page, limit, total);
      }

      const { recipes, total } = await recipeModel.findRecipesWithPagination(
        limit,
        offset
      );

      return sendPaginatedResponse(res, recipes, page, limit, total);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao carregar as receitas." });
    }
  },
};

module.exports = recipeController;
