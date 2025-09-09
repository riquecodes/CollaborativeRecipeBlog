function validateRecipe(req, res, next) {
  const { title, ingredients, instructions, category } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).send({ error: "O título é obrigatório." });
  }

  if (!category || category.trim() === "") {
    return res.status(400).send({ error: "A categoria deve ser selecionada." });
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).send({ error: "Informe pelo menos 1 ingrediente." });
  }

  if (!instructions || instructions.trim().length < 40) {
    return res
      .status(400)
      .send({ error: "as instruções devem ter pelo menos 40 caracteres." });
  }
  next();
}

function validateComment(req, res, next) {
  const { author, content } = req.body;
  if (!author || author.trim() === "") {
    return res.status(400).send({ error: "O nome do autor é obrigatório." });
  }

  if (!content || content.trim().length < 10) {
    return res
      .status(400)
      .send({
        error: "O conteúdo do comentário deve ter pelo menos 10 caracteres.",
      });
  }
  next();
}

module.exports = { validateRecipe, validateComment };
