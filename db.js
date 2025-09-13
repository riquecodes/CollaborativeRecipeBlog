const mysql = require("mysql2/promise");

// cria o pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",    
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "receitas_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
