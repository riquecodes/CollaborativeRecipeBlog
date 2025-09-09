class Recipe {
  constructor({
    id,
    title,
    ingredients,
    instructions,
    author,
    category,
    createdAt,
  }) {
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.author = author;
    this.category = category;
    this.createdAt = createdAt;
  }
}

module.exports = Recipe;