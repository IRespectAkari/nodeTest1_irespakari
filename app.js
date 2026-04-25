// better-sqlite3パッケージを読み込む 
const Database = require('better-sqlite3'); 
// データベースファイルに接続（ファイルが無ければ自動で作られる） 
const db = new Database('my_database.db'); 
console.log("データベースに接続しました"); 
// 1. テーブル（データの入れ物）を作成する 
db.exec(`
CREATE TABLE IF NOT EXISTS users ( 
id INTEGER PRIMARY KEY AUTOINCREMENT, 
name TEXT NOT NULL, 
age INTEGER 
)
`); 
console.log("テーブルの準備が完了しました。"); 
// 2. データを追加する準備と実行 
const insert = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)'); 
insert.run('Akari', 15); 
insert.run('Sumire', 15); 
console.log('データを追加しました！'); 
// 3. データを読み込んで表示する 
const selectAll = db.prepare('SELECT * FROM users'); 
const users = selectAll.all(); 
console.log("【現在のデータ一覧】"); 
console.log(users); 
// 最後にデータベースを閉じる 
db.close(); 
