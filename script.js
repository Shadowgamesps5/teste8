const container = document.getElementById("container");

async function carregarLikes() {
  try {
    const resposta = await fetch("data.json");
    const dados = await resposta.json();

    dados.slice(-10).forEach((item, index) => {
      setTimeout(() => {
        mostrarLike(item.nome, item.likes);
      }, index * 800); // espaço de 0.8s entre cada nome
    });
  } catch (erro) {
    console.error("Erro ao carregar likes:", erro);
  }
}

function mostrarLike(nome, likes) {
  const box = document.createElement("div");
  box.className = "like-box";
  box.innerHTML = `${nome} +${likes} <span class="heart">❤️</span>`;
  container.appendChild(box);

  setTimeout(() => {
    container.removeChild(box);
  }, 5000);
}

setInterval(carregarLikes, 6000);
