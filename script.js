let filaLikes = [];
let exibindo = false;

function carregarLikes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Sempre adiciona os últimos nomes ao fim da fila
      data.slice(-10).forEach(item => {
        filaLikes.push(`${item.nome} +${item.likes} ❤️`);
      });
    });
}

function exibirUmPorVez() {
  if (exibindo || filaLikes.length === 0) return;

  exibindo = true;
  const container = document.getElementById("likes-container");
  const div = document.createElement("div");
  div.className = "like-box";
  div.innerText = filaLikes.shift();
  container.appendChild(div);

  setTimeout(() => {
    div.remove();
    exibindo = false;
  }, 5000); // Duração total do efeito
}

setInterval(carregarLikes, 2000);   // Busca novos dados
setInterval(exibirUmPorVez, 300);   // Mostra 1 nome por vez
