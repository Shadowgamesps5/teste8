const container = document.getElementById("likes-container");
let likesData = [];
let currentIndex = 0;
const maxLikesNaTela = 2;
const likesAtivos = [];

async function fetchLikes() {
  try {
    const response = await fetch("data.json?cache=" + new Date().getTime());
    const data = await response.json();

    if (JSON.stringify(data) !== JSON.stringify(likesData)) {
      likesData = data;
      currentIndex = 0;
      iniciarSequencia();
    }
  } catch (e) {
    console.error("Erro ao carregar JSON:", e);
  }
}

function iniciarSequencia() {
  if (currentIndex >= likesData.length) return;

  if (likesAtivos.length < maxLikesNaTela) {
    mostrarLike(likesData[currentIndex]);
    currentIndex++;
  }

  setTimeout(iniciarSequencia, 750);
}

function mostrarLike(item) {
  const box = document.createElement("div");
  box.className = "like-box";
  box.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
  container.appendChild(box);
  likesAtivos.push(box);

  requestAnimationFrame(() => {
    box.style.transform = "translateY(-140px)";
    box.style.opacity = "0";
  });

  setTimeout(() => {
    container.removeChild(box);
    likesAtivos.shift();
  }, 1700);
}

// Atualiza o JSON a cada 2 segundos
setInterval(fetchLikes, 2000);
