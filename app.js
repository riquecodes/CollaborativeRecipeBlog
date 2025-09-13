const express = require('express');
const app = express();
const routes = require('./routes/recipes');
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});