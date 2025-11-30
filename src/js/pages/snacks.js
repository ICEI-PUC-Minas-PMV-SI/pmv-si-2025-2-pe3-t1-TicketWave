(function () {

    // Evita recriação caso o script carregue duas vezes
    if (window.Snacks) return;

    function renderSnacksModule() {

        function renderCombos(container, combos) {
            let html = `
                <h2 id="add-snack-title">Deseja adicionar um snack ao seu pedido?</h2>
                <div class="snack-grid">
            `;

            combos.forEach(combo => {
                html += `
                    <div class="snack-card" data-id="${combo.id}">
                        <img src="${combo.snackimage}" alt="${combo.nome}">
                        <h3>${combo.nome}</h3>
                        <p>${combo.descricao}</p>
                        <strong>R$ ${combo.preco.toFixed(2)}</strong>

                        <div class="snack-overlay">Adicionar ao carrinho</div>
                    </div>
                `;
            });

            html += `</div>`;
            container.innerHTML = html;

            // Marca/desmarca o card ao clicar
            container.querySelectorAll(".snack-card").forEach(card => {
                card.addEventListener("click", () => {
                    card.classList.toggle("active");
                });
            });
        }

        function render(container, encodedParams) {

            if (!encodedParams) {
                console.error("ERRO: params.data não foi recebido");
                container.innerHTML = "<h3>Erro ao carregar snacks.</h3>";
                return;
            }

            const decoded = JSON.parse(decodeURIComponent(encodedParams));
            const { sessionId, movieId, selectedSeats } = decoded;

            const combos = DataLoader.getCombosClassicos();

            container.innerHTML = `
                <h2 id="snacks-title">Snacks & Combos</h2>
                <p>Assentos selecionados: <strong>${selectedSeats.join(", ")}</strong></p>

                <div id="snacks-container"></div>

                <button id="btn-next" class="btn-primary mt-3">Continuar</button>
            `;

            const grid = container.querySelector("#snacks-container");
            renderCombos(grid, combos);

            // Botão para avançar ao checkout
            document.getElementById("btn-next").addEventListener("click", () => {

                const selectedCombos = [...grid.querySelectorAll(".snack-card.active")].map(card => ({
                    id: card.dataset.id,
                    nome: card.querySelector("h3").innerText
                }));

                const finalParams = encodeURIComponent(JSON.stringify({
                    sessionId,
                    movieId,
                    selectedSeats,
                    selectedCombos
                }));

                window.location.hash = `#checkout?data=${finalParams}`;
            });
        }

        return { render };
    }

    window.Snacks = renderSnacksModule();

})();
