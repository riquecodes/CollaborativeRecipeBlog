const express = require('express')
const router = express.Router();
const { validateRecipe, validateComment } = require("../middlewares/validation");
const checkRecipeExists = require("../middlewares/checkRecipe");

const recipeController = require('../controllers/recipeControllers');

router.get('/recipes', recipeController.index);

router.post('/recipes', validateRecipe, recipeController.create);

router.get('/recipes/:id', checkRecipeExists, recipeController.show);

router.post('/recipes/:id/comments', checkRecipeExists, validateComment, recipeController.addComment);

module.exports = router;