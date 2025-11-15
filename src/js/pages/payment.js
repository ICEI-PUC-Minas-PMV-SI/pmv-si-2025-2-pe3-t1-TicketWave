
function renderPayment(container, movieId) {
    const paymentWrapper = document.createElement('div');
    paymentWrapper.className = 'payment-wrapper';
    paymentWrapper.innerHTML = `
        <div class="page-header">
            <h1>Finalize o Pagamento</h1>
        </div>
        <div id="payment-form-wrapper">
            <form id="payment-form">
                <div class="mb-3">
                    <label for="cardholder-name" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" id="cardholder-name" placeholder="Nome completo" required>
                </div>

                <div class="mb-3">
                    <label for="card-number" class="form-label">Número do Cartão</label>
                    <input type="text" class="form-control" id="card-number" placeholder="1234 5678 9012 3456" maxLength=19 required>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="expiry" class="form-label">Validade</label>
                            <input type="text" class="form-control" id="expiry" placeholder="MM/AA" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="cvv" class="form-label">CVV</label>
                            <input type="text" class="form-control" id="cvv" placeholder="123" maxLength=3 required>
                        </div>
                    </div>
                </div>
                
                <button type="submit" id="payment-submit-btn" class="btn btn-primary w-100">Finalizar Pagamento</button>
            </form>
        </div>
    
    `;

    container.appendChild(paymentWrapper);
    
    const cardNumberInput = paymentWrapper.querySelector('#card-number');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
    });
    
    const expiryInput = paymentWrapper.querySelector('#expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}