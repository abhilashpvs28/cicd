const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

async function ensureTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );`);
  console.log('users table ready');
}

app.get('/', (_, res) => res.json({ message: 'Welcome' }));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *',
    [username, password]
  );
  res.json({ message: 'User registered', user: rows[0] });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { rows } = await pool.query(
    'SELECT * FROM users WHERE username=$1 AND password=$2',
    [username, password]
  );
  rows.length
    ? res.json({ message: 'Login ok', user: rows[0] })
    : res.status(401).json({ message: 'Wrong credentials' });
});

(async () => {
  await ensureTable();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => console.log(`Server on ${PORT}`));
})();
