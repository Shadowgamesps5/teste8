let filaLikes = [];
let exibidos = [];

function carregarLikes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.slice(-10).forEach(item => {
        const texto = `${item.nome} +${item.likes} ❤️`;
        if (!filaLikes.includes(texto)) {
          filaLikes.push(texto);
        }
      });
    });
}

function exibirLike() {
  if (filaLikes.length === 0) return;

  const container = document.getElementById("likes-container");
  const div = document.createElement("div");
  div.className = "like-box";
  div.innerText = filaLikes.shift();
  container.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 5000); // Cada nome dura 5 segundos
}

setInterval(carregarLikes, 2000);  // Atualiza dados do JSON
setInterval(exibirLike, 300);      // Exibe um novo nome a cada 300ms
