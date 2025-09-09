const recipeModel = require("../models/recipeModel");
const commentModel = require("../models/commentModel");

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

  async show(req, res) {
    try {
      const { id } = req.params;
      const recipe = await recipeModel.findById(id);

      const comments = await commentModel.findByRecipeId(id);

      return res.json({ recipe, comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao carregar a receita." });
    }
  },

  async addComment(req, res) {
    try {
      const { id } = req.params;
      const { author, content } = req.body;

      const newComment = await commentModel.create({
        recipeId: id,
        author,
        content,
      });

      return res.status(201).json(newComment);
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao adicionar o comentário." });
    }
  }
};

module.exports = recipeController;
