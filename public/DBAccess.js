// ページが読み込まれたら自動的に実行される処理
document.addEventListener('DOMContentLoaded', () => {
  // 最初にデータを読み込む
  databaseLoad();

  document.getElementById('save-btn').addEventListener("click", saveUser);
  document.getElementById('save-btn').addEventListener("click", resetForm);
});

async function databaseLoad(){
  console.log("databaseLoad start");

  const response = await fetch('/api/users');
  const users = await response.json();
  const tbody = document.getElementById('user-table-body');

  tbody.innerHTML = "";// 一旦空にする

  users.forEach(user => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.age}</td>
              <td>
                <button class="btn edit" onclick="startEdit(${user.id}, '${user.name}', ${user.age})">編集</button>
                <button class="btn delete" onclick="deleteUser(${user.id})">削除</button>
              </td>
          `;

    tbody.appendChild(tr);
  });
}

async function saveUser(){
  const id = document.getElementById('edit-id').value;
  const name = document.getElementById('input-name').value;
  const age = document.getElementById('input-age').value;

  if(!name || !age){
    alert("名前と年齢を入力してください！");
    return;
  }

  const payload = { name: name, age: Number(age) };

  if(id){
    // IDがある場合は更新（PUT）
    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } else {
    // IDが無い場合は新規作成（POST）
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  resetForm();
  databaseLoad();
}

async function deleteUser(id){
  if(confirm("本当に削除しますか？")){
    await fetch(`/api/users/${id}`, {
      method: "DELETE"
    });
    databaseLoad();
  }
}


window.startEdit = function(id, name, age) {
  document.getElementById("form-title").innerText = "✍ユーザーを編集"
  document.getElementById("edit-id").value = id;
  document.getElementById("input-name").value = name;
  document.getElementById("input-age").value = age;
  document.getElementById("save-btn").innreText = "更新する"
  document.getElementById("cancel-btn").style.display = "inline-block";
}

function resetForm() {
  document.getElementById("form-title").innerText = "✍新しいユーザーを追加"
  document.getElementById("edit-id").value = "";
  document.getElementById("input-name").value = "";
  document.getElementById("input-age").value = "";
  document.getElementById("save-btn").innreText = "保存する"
  document.getElementById("cancel-btn").style.display = "none";
}