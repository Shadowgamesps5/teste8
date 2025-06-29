let filaLikes = [];

async function carregarLikes() {
    try {
        const res = await fetch('data.json?_=' + new Date().getTime());
        const texto = await res.text();

        if (texto !== ultimaVersao && texto !== "[]") {
            ultimaVersao = texto;
            const data = JSON.parse(texto);
            filaLikes.push(...data); // adiciona os novos ao final da fila
        }
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

function exibirProximoLike() {
    if (filaLikes.length === 0) return;

    const item = filaLikes.shift(); // tira o próximo da fila
    const container = document.getElementById("like-container");

    const div = document.createElement("div");
    div.className = "like-box";
    div.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
    container.appendChild(div);

    // Remove depois de 4 segundos
    setTimeout(() => {
        container.removeChild(div);
    }, 4000);
}

// Tenta carregar novos likes do GitHub a cada 4 segundos
setInterval(carregarLikes, 4000);

// Exibe um da fila a cada 800ms (ajusta pra mais ou menos se quiser)
setInterval(exibirProximoLike, 800);
