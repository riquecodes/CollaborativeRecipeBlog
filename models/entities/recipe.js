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
    if (!title || title.trim() === "") {
      throw new Error("O título é obrigatório.");
    }

    if (!category || category.trim() === "") {
      throw new Error("A categoria deve ser selecionada.");
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      throw new Error("Informe pelo menos um ingrediente.");
    }

    if (!instructions || instructions.trim().length < 10) {
      throw new Error("As instruções devem ter pelo menos 40 caracteres.");
    }

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