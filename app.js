const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const port = 3000;

// データベースに接続
const db = new Database('my_database.db');

// publicフォルダの中身（HTMLなど）をブラウザに見せる設定
app.use(express.static('public'));

// 【重要】ブラウザから「/api/users」にアクセスされたら、DBの中身をJSONで返す
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users); // ここでJSONとして返却！
});

// サーバーを起動する
app.listen(port, () => {
  console.log(`サーバーが起動しました！http://localhost:${port}にアクセスしてください`);
});