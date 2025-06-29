const container = document.getElementById("likes-container");
let likesData = [];
let currentIndex = 0;
const maxLikesNaTela = 2;
let likesAtivos = [];
let sequenciaTimeout = null;
let fetchInterval = null;

async function fetchLikes() {
  try {
    const response = await fetch("data.json?cache=" + new Date().getTime());
    const data = await response.json();

    // Se o JSON mudou, reinicia o estado
    if (JSON.stringify(data) !== JSON.stringify(likesData)) {
      likesData = data;
      currentIndex = 0;

      // Limpa likes ativos da tela
      likesAtivos.forEach(box => {
        if (container.contains(box)) container.removeChild(box);
      });
      likesAtivos = [];

      // Limpa timeouts pendentes
      if (sequenciaTimeout) clearTimeout(sequenciaTimeout);

      // Começa a exibir a sequência nova
      iniciarSequencia();
    }
  } catch (e) {
    console.error("Erro ao carregar JSON:", e);
  }
}

function iniciarSequencia() {
  // Se terminou a lista, não faz nada
  if (currentIndex >= likesData.length) return;

  // Se tem espaço na tela, mostra o próximo like
  if (likesAtivos.length < maxLikesNaTela) {
    mostrarLike(likesData[currentIndex]);
    currentIndex++;
  }

  // Programa a próxima chamada da sequência
  sequenciaTimeout = setTimeout(iniciarSequencia, 750);
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

  // Remove após a animação e libera espaço na tela
  setTimeout(() => {
    if (container.contains(box)) container.removeChild(box);
    likesAtivos = likesAtivos.filter(b => b !== box);
  }, 1700);
}

// Começa o fetch repetido a cada 2 segundos
function iniciarFetchInterval() {
  if (fetchInterval) clearInterval(fetchInterval);
  fetchInterval = setInterval(fetchLikes, 2000);
}

// Inicia a função
iniciarFetchInterval();
fetchLikes();
