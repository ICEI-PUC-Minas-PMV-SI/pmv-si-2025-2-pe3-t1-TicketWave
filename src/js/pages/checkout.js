function renderCheckout(container, movieId, sessionId) {
    const currentMovie = DataLoader.getMovie(movieId);
    const checkoutContainer = document.createElement('div');
    checkoutContainer.className = 'checkout-wrapper';
    checkoutContainer.innerHTML = `
        <div class="checkout-go-back-button">
            <!-- Button added here dynamically -->
        </div>

        ${getMovieHeader(currentMovie)}

        <div class="checkout-details">
            <div class="card mb-4 checkout-card">
                <div class="card-body">
                    <h5 class="card-title mb-3">Detalhes da Reserva</h5>
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td><strong>Código da Reserva:</strong></td>
                                <td>
                                    <span class="text-primary">AXH3G4K5L</span>
                                    <br><small class="text-muted">Por favor, anote este código</small>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Assentos:</strong></td>
                                <td>
                                    ${['A5', 'A6', 'A7', 'A8'].map(seat =>
                                        `<span class="badge bg-primary me-1">${seat}</span>`
                                    ).join('')}
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Número de Ingressos:</strong></td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="price-breakdown">
            <div class="card mb-4 checkout-card">
                <div class="card-body">
                    <h5 class="card-title mb-3">Resumo</h5>
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>Ingressos (4 x R$ 24,99)</td>
                                <td class="text-end">R$ 99,96</td>
                            <tr>
                            <tr>
                                <td>Pipoca G (1 x R$ 39,99)</td>
                                <td class="text-end">R$ 39,99</td>
                            <tr>
                            <tr>
                                <td>Refrigerante G (1 x R$ 12,99)</td>
                                <td class="text-end">R$ 12,99</td>
                            <tr>
                            <tr class="border-top">
                                <td><strong>Total a Pagar:</strong></td>
                                <td class="text-end"><strong class="text-success">R$ 99,96</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const goBackButton = getGoBackButton('seatmap', { sessionId } );
    checkoutContainer
        .querySelector('.checkout-go-back-button')
        .appendChild(goBackButton);

    const goToPaymentButton = document.createElement('div');
    goToPaymentButton.className = 'checkout-finish-btn';
    goToPaymentButton.innerHTML = `
        <button class="btn btn-primary">Fechar Pedido</button>
    `;
    goToPaymentButton.addEventListener('click', () => window.navigate('payment'));
    checkoutContainer.appendChild(goToPaymentButton);

    container.appendChild(checkoutContainer);
}