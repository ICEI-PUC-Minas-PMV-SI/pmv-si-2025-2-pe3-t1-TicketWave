(function () {

    function render(container, encodedParams) {

        let data = null;

        try {
            data = JSON.parse(decodeURIComponent(encodedParams));
        } catch (err) {
            console.error("Erro ao decodificar dados do checkout:", err);
            container.innerHTML = "<h3>Erro ao carregar o checkout.</h3>";
            return;
        }

        const {
            movieId,
            sessionId,
            selectedSeats = [],
            selectedCombos = []
        } = data;

        const ticketPrice = 20;
        const ticketCount = selectedSeats.length;
        const ticketsTotal = ticketCount * ticketPrice;

        const combosTotal = selectedCombos.reduce((acc, c) => {
            return acc + Number(c.preco || 0) * (c.quantity || 1);
        }, 0);

        const totalGeral = combosTotal + ticketsTotal;

        const listaAssentos = selectedSeats.length
            ? selectedSeats.map(s => `<span class="badge bg-primary me-1">${s}</span>`).join("")
            : "<em>Nenhum assento selecionado</em>";

        const listaSnacksDetalhada = selectedCombos.length
            ? selectedCombos.map(c => `
                <div class="checkout-snack-item d-flex justify-content-between">
                    <span>${c.nome} (x${c.quantity})</span>
                    <strong>R$ ${(c.preco * c.quantity).toFixed(2)}</strong>
                </div>
            `).join("")
            : "<em>Nenhum snack selecionado</em>";

        container.innerHTML = `
            <div class="checkout-wrapper">
                
                <div class="checkout-go-back-button"></div>

                <h2 class="checkout-title">Resumo do Pedido</h2>

                <div class="checkout-details">

                    <div class="card mb-4 checkout-card">
                        <div class="card-body">
                            <h5 class="card-title mb-3">Detalhes da Reserva</h5>

                            <table class="table table-borderless">
                                <tbody>

                                    <tr>
                                        <td><strong>Assentos:</strong></td>
                                        <td id="checkout-assentos-list">${listaAssentos}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Nº de Ingressos:</strong></td>
                                        <td id="checkout-quantidade-ingressos">${ticketCount}</td>
                                    </tr>

                                    <tr>
                                        <td><strong>Snacks Selecionados:</strong></td>
                                        <td id="checkout-snacks-list">
                                            ${listaSnacksDetalhada}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <div class="price-breakdown">

                    <div class="card mb-4 checkout-card">
                        <div class="card-body">

                            <h5 class="card-title mb-3">Resumo da Compra</h5>

                            <div class="d-flex justify-content-between">
                                <span>Ingressos:</span>
                                <strong id="checkout-ingressos-total">
                                    R$ ${ticketsTotal.toFixed(2)}
                                </strong>
                            </div>

                            <div class="d-flex justify-content-between mt-2">
                                <span>Snacks:</span>
                                <strong id="checkout-combos-total">
                                    R$ ${combosTotal.toFixed(2)}
                                </strong>
                            </div>

                            <hr>

                            <div class="d-flex justify-content-between total-line">
                                <strong>Total Geral:</strong>
                                <strong id="checkout-total-geral">
                                    R$ ${totalGeral.toFixed(2)}
                                </strong>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="checkout-finish-btn">
                    <button class="btn btn-primary w-100" id="checkout-finish-btn">Fechar Pedido</button>
                </div>

            </div>
        `;
        
        try {
            const goBackButton = typeof getGoBackButton === 'function'
                ? getGoBackButton("snacks", {
                    data: encodeURIComponent(JSON.stringify(data))
                })
                : null;

            if (goBackButton) {
                container
                    .querySelector(".checkout-go-back-button")
                    .appendChild(goBackButton);
            }
        } catch (e) {
            console.warn('Não foi possível renderizar goBackButton:', e);
        }

        const finishBtn = container.querySelector('#checkout-finish-btn');

        if (finishBtn) {
            if (!selectedSeats || selectedSeats.length === 0) {
                finishBtn.disabled = true;
                finishBtn.classList.add('disabled');
            }

            finishBtn.addEventListener('click', (ev) => {
                ev.preventDefault();

                if (finishBtn.disabled) return;

                const checkoutData = {
                    movieId,
                    sessionId,
                    selectedSeats,
                    selectedCombos,
                    totals: {
                        ticketsTotal,
                        combosTotal,
                        totalGeral
                    },
                    timestamp: Date.now()
                };

                try {
                    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
                } catch (err) {
                    console.error('Erro ao salvar checkoutData no sessionStorage', err);
                    alert('Não foi possível salvar os dados do pedido localmente.');
                    return;
                }

                window.location.hash = '#payment';
            });
        }

    }

    window.Checkout = { render };
    window.renderCheckout = render;

})();
