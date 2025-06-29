let lastData = [];

function carregarLikes() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Evita repetição se os dados forem idênticos
      if (JSON.stringify(data) === JSON.stringify(lastData)) return;
      lastData = data;

      const container = document.getElementById("likes-container");
      container.innerHTML = "";

      data.slice(-10).forEach(item => {
        const div = document.createElement("div");
        div.className = "like-box";
        div.innerHTML = `${item.nome} +${item.likes} <span class="heart">❤️</span>`;
        container.appendChild(div);
      });
    });
}

setInterval(carregarLikes, 2000);
