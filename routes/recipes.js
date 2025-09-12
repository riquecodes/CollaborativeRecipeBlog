const express = require('express')
const router = express.Router();
const { validateRecipe, validateComment } = require("../middlewares/validationData");
const checkRecipeExists = require("../middlewares/checkRecipesExists");
const path = require('path');

const recipeController = require('../controllers/recipeControllers');

router.get('/recipes', recipeController.index);

router.post('/recipes', validateRecipe, recipeController.create);

router.get('/recipes/:id', checkRecipeExists, recipeController.show);

router.post('/recipes/:id/comments', checkRecipeExists, validateComment, recipeController.addComment);

router.get('/createRecipe', (req, res) => {
    res.sendFile(path.join(__dirname, './views/createRecipe.html')); // criar receita 
});

module.exports = router;