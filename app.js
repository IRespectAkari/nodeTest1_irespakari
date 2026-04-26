const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const port = 3000;

// データベースに接続
const db = new Database('my_database.db');

// publicフォルダの中身（HTMLなど）をブラウザに見せる設定
app.use(express.static('public'));
// ブラウザから送られてくるJSONデータを読み解くための設定
app.use(express.json());

// Read: 全ユーザー取得（GET）
app.get('/api/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});

// Create: 新規ユーザー追加（POST）
app.post('/api/users', (req, res) => {
  const { name, age } = req.body;// ブラウザから送られた名前と年齢を受け取る
  const insert = db.prepare('INSERT INTO users (name, age) VALUEAS (?, ?)');
  const info = insert.run(name, age);
  res.json({ success: true, id: info.lastInsertRowid });
});

// Update: ユーザー情報の更新（PUT）
app.put('/api/users:id', (req, res) => {
  const id = req.params.id;// URLの末尾のIDを受け問る
  const { name, age } = req.body;
  const update = db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?');
  update.run(name, age, id);
  res.json({ success: true });
});

// Delete: ユーザー削除（DELETE）
app.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const del = db.prepare('DELETE FROM users WHERE id = ?');
  del.run(id);
  res.json({ success: true });
});

// サーバーを起動する
app.listen(port, () => {
  console.log(`サーバーが起動しました！http://localhost:${port}にアクセスしてください`);
});