const container = document.getElementById("likes-container");
let likesData = [];
let currentIndex = 0;
const maxLikesNaTela = 2;
const likesAtivos = [];

async function fetchLikes() {
  try {
    const response = await fetch("data.json?cache=" + new Date().getTime());
    const data = await response.json();

    // Se mudou o array de likes, reseta o índice
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

  // Reexecuta a função após um tempo pra continuar o fluxo
  setTimeout(iniciarSequencia, 600); // 600ms para entrar o próximo quando o anterior está na metade do caminho
}

function mostrarLike(item) {
  const box = document.createElement("div");
  box.className = "like-box";
  box.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
  container.appendChild(box);
  likesAtivos.push(box);

  // Força renderização antes de aplicar transform para a animação funcionar
  requestAnimationFrame(() => {
    box.style.transform = "translateY(-140px)";
    box.style.opacity = "0";
  });

  // Remove após a transição
  setTimeout(() => {
    container.removeChild(box);
    likesAtivos.shift();
  }, 1200); // 600ms subir + 600ms sumir (aprox)
}

// Atualiza o JSON a cada 2 segundos
setInterval(fetchLikes, 2000);
