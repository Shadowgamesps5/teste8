let filaLikes = [];

async function carregarLikes() {
    try {
        const res = await fetch('data.json?_=' + new Date().getTime());
        const data = await res.json();

        // Se a fila estiver vazia, carrega os dados do JSON
        if (filaLikes.length === 0 && data.length > 0) {
            filaLikes = [...data];
        }

    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

function exibirProximoLike() {
    if (filaLikes.length === 0) return;

    const item = filaLikes.shift();
    const container = document.getElementById("like-container");

    const div = document.createElement("div");
    div.className = "like-box";
    div.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
    container.appendChild(div);

    // Remove da tela após a animação (4s)
    setTimeout(() => {
        container.removeChild(div);
    }, 4000);
}

// Atualiza a fila a cada 4 segundos
setInterval(carregarLikes, 4000);

// Mostra um novo item da fila a cada 4 segundos
setInterval(exibirProximoLike, 4000);
