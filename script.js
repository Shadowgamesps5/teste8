let filaLikes = [];
let ultimaVersao = "";

async function carregarLikes() {
    try {
        const res = await fetch('data.json?_=' + new Date().getTime());
        const texto = await res.text();

        if (texto !== ultimaVersao) {
            ultimaVersao = texto;
            const data = JSON.parse(texto);
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

    setTimeout(() => {
        container.removeChild(div);
    }, 4000);
}

setInterval(carregarLikes, 4000);
setInterval(exibirProximoLike, 4000);
