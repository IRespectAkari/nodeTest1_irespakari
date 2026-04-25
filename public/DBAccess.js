// ページが読み込まれたら自動的に実行される処理
document.addEventListener('DOMContentLoaded', async () => {

  // 1. さっき成功したAPI（/api/users）にアクセスしてJSONを取得！
  const response = await fetch('/api/users');
  const users = await response.json();

  // 2. データを流し込むための場所（tbody）を見つける
  const tbody = document.getElementById('user-table-body');

  // 3. 取得したデータ（配列）を1つずつ取り出して、HTMLの行（tr）を作っていく
  users.forEach(user => {
    // 新しい行（tr）を作る
    const tr = document.createElement('tr');

    // その行の中にデータ（td）を詰め込む
    tr.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.age}</td>
          `;

    // 完成した行をtbodyに追加する
    tbody.appendChild(tr);
  });
});
