const likesContainer = document.getElementById("likes-container");

let ultimaLista = [];
let indiceAtual = 0;

async function buscarLikes() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/Shadowgamesps5/teste8/main/data.json?" + new Date().getTime());
    const data = await response.json();

    // Só atualiza se mudou o conteúdo
    const novoJson = JSON.stringify(data);
    const ultimoJson = JSON.stringify(ultimaLista);

    if (novoJson !== ultimoJson) {
      ultimaLista = data;
      indiceAtual = 0;
    }
  } catch (error) {
    console.error("Erro ao buscar likes:", error);
  }
}

function criarLikeBox(nome, qtd) {
  const likeBox = document.createElement("div");
  likeBox.className = "like-box";

  const texto = document.createTextNode(`${nome} +${qtd}`);
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤️";

  likeBox.appendChild(texto);
  likeBox.appendChild(heart);
  likesContainer.appendChild(likeBox);

  setTimeout(() => {
    likeBox.remove();
  }, 8000); // Remove após a animação de 8s
}

setInterval(async () => {
  await buscarLikes();

  if (indiceAtual < ultimaLista.length) {
    const like = ultimaLista[indiceAtual];
    criarLikeBox(like.nome, like.likes);
    indiceAtual++;
  }
}, 2000); // ⏱️ Mostra 1 nome novo a cada 2 segundos
