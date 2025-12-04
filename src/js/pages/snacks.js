(function () {

    if (window.Snacks) return;

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

        const combos = DataLoader.getCombosClassicos() || [];

        container.innerHTML = `
            <h2 id="snacks-title">Snacks & Combos</h2>
            <p>Assentos selecionados: <strong>${selectedSeats.join(", ")}</strong></p>

            <div id="snacks-container"></div>

            <button id="btn-next" class="btn-primary mt-3">Continuar</button>
        `;

        const backButton = getGoBackButton("seatmap", { sessionId });
        container.prepend(backButton);


        const grid = container.querySelector("#snacks-container");
        renderCombos(grid, combos);

        document.getElementById("btn-next").addEventListener("click", () => {

            const selectedCombos = [...grid.querySelectorAll(".snack-card.active")].map(card => {
                const id = card.dataset.id;
                const fullCombo = combos.find(c => c.id === id);

                return {
                    id: fullCombo.id,
                    nome: fullCombo.nome,
                    preco: fullCombo.preco,
                    quantity: 1
                };
            });

            const subtotal = selectedCombos.reduce((acc, combo) =>
                acc + combo.preco * combo.quantity
            , 0);

            const checkoutData = {
                sessionId,
                movieId,
                selectedSeats,
                selectedCombos,
                subtotal
            };

            const finalParams = encodeURIComponent(JSON.stringify(checkoutData));

            window.location.hash = `#checkout?data=${finalParams}`;
        });
    }

    window.Snacks = { render };

})();
