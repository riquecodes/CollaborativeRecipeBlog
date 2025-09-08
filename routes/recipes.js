import express from "express";

const express = require('express')
const router = express.Router();

const recipeController = require('../controllers/recipeControllers');

router.get('/recipes', recipeController.index);

module.exports = router;