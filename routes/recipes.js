const express = require('express')
const router = express.Router();

const recipeController = require('../controllers/recipeControllers');

router.get('/recipes', recipeController.index);

router.post('/recipes', recipeController.create);

module.exports = router;