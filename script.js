async function carregarLikes() {
    try {
        const res = await fetch('data.json?_=' + new Date().getTime());
        const data = await res.json();

        const container = document.getElementById("like-container");
        container.innerHTML = ""; // Limpa o anterior

        if (data.length > 0) {
            const item = data[0]; // Mostra só o primeiro
            const div = document.createElement("div");
            div.className = "like-box";
            div.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
            container.appendChild(div);
        }
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
    }
}

// Atualiza a cada 4 segundos
setInterval(carregarLikes, 4000);
