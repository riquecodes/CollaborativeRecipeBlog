const recipeModel = require("../models/recipeModel");

async function checkRecipeExists(req, res, next) {
  const recipe = await recipeModel.findById(req.params.id);
  if (!recipe) {
    return res.status(404).send({ error: "Receita não encontrada." });
  }
  req.recipe = recipe;
  next();
}

module.exports = checkRecipeExists;