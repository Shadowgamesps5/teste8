let lastData = [];
let currentIndex = 0;

function fetchLikes() {
  fetch("data.json?cache=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      if (JSON.stringify(data) !== JSON.stringify(lastData)) {
        lastData = data;
        currentIndex = 0;
        mostrarLikesSequenciais(data);
      }
    })
    .catch(error => console.error("[ERRO] Ao buscar data.json:", error));
}

function mostrarLikesSequenciais(data) {
  if (currentIndex >= data.length) return;

  const like = data[currentIndex];
  mostrarLike(like.nome, like.likes);
  currentIndex++;

  setTimeout(() => mostrarLikesSequenciais(data), 3000); // espaço entre nomes
}

function mostrarLike(nome, qtdLikes) {
  const container = document.getElementById("likes-container");
  const div = document.createElement("div");
  div.className = "like-box";

  const texto = document.createTextNode(`${nome} +${qtdLikes}`);
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤️";

  div.appendChild(texto);
  div.appendChild(heart);
  container.appendChild(div);

  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = "translateY(-100px)";
    setTimeout(() => container.removeChild(div), 1000);
  }, 5000);
}

setInterval(fetchLikes, 4000);
