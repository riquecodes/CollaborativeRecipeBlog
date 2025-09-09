class Comment {
  constructor({
    id,
    author,
    content,
    recipeId,
    createdAt,
  }) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.recipeId = recipeId;
    this.createdAt = createdAt;
  }
}

module.exports = Comment;