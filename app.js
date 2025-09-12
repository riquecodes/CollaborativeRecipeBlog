const express = require('express');
const app = express();
const routes = require('./routes/recipes'); // ajuste o caminho se necessário
const PORT = process.env.PORT || 3000;
const path = require('path');

// Ativa o public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para ler JSON no body
app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});