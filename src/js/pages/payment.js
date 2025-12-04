// payment.js (versão robusta — evita erros quando container ou elementos faltam)

function parseDataFromHash() {
  try {
    const hash = window.location.hash || '';
    const idx = hash.indexOf('?');
    if (idx === -1) return null;
    const query = hash.substring(idx + 1);
    const params = new URLSearchParams(query);
    const dataEncoded = params.get('data');
    if (!dataEncoded) return null;
    const decoded = decodeURIComponent(dataEncoded);
    return JSON.parse(decoded);
  } catch (err) {
    console.warn('[payment] falha ao parsear dados da hash:', err);
    return null;
  }
}

function safeQuery(parent, selector) {
  if (!parent) return null;
  try {
    return parent.querySelector(selector);
  } catch (err) {
    console.warn('[payment] safeQuery falhou para selector', selector, err);
    return null;
  }
}

function ensureContainer(container) {
  if (container) return container;
  const fallback = document.getElementById('app') || document.querySelector('#root') || document.body;
  console.warn('[payment] container recebido era nulo — usando fallback:', fallback);
  return fallback;
}

function renderPayment(container /*, movieId se seu router passar esse param */) {
  // garante container válido (não deixar null)
  container = ensureContainer(container);
  if (!container) {
    console.error('[payment] Nenhum container disponível para renderPayment — abortando.');
    return;
  }

  // limpa container antes de renderizar
  container.innerHTML = '';

  // tenta recuperar os dados do checkout do sessionStorage primeiro
  let checkoutData = null;
  try {
    const raw = sessionStorage.getItem('checkoutData');
    if (raw) {
      checkoutData = JSON.parse(raw);
      console.log('[payment] dados lidos de sessionStorage:', checkoutData);
    }
  } catch (e) {
    console.warn('[payment] erro lendo sessionStorage:', e);
  }

  // se não achou, tenta decodificar da hash (fallback)
  if (!checkoutData) {
    const fromHash = parseDataFromHash();
    if (fromHash) {
      checkoutData = fromHash;
      console.log('[payment] dados lidos da hash:', checkoutData);
      try {
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        console.log('[payment] re-salvando checkoutData em sessionStorage');
      } catch (err) {
        console.warn('[payment] não foi possível re-salvar checkoutData:', err);
      }
    }
  }

  if (!checkoutData || !checkoutData.selectedSeats || checkoutData.selectedSeats.length === 0) {
    // mostra erro amigável e botão para voltar à seleção
    const errorWrap = document.createElement('div');
    errorWrap.className = 'payment-error p-3';
    errorWrap.innerHTML = `
      <h3>Dados do pedido não encontrados</h3>
      <p>Não conseguimos recuperar os dados do seu pedido. Volte e selecione os ingressos novamente.</p>
      <div class="mb-2">
        <button id="payment-back-to-seats" class="btn btn-secondary">Voltar</button>
      </div>
      <div class="mb-2">
        <button id="payment-debug" class="btn btn-outline-secondary">Depurar hash/sessionStorage</button>
      </div>
    `;
    container.appendChild(errorWrap);

    const backBtn = safeQuery(errorWrap, '#payment-back-to-seats');
    if (backBtn) backBtn.addEventListener('click', () => window.location.hash = '#/seats');

    const debugBtn = safeQuery(errorWrap, '#payment-debug');
    if (debugBtn) debugBtn.addEventListener('click', () => {
      console.log('[payment-debug] current hash:', window.location.hash);
      try { console.log('[payment-debug] sessionStorage.checkoutData:', sessionStorage.getItem('checkoutData')); } 
      catch (err) { console.warn('[payment-debug] erro ao acessar sessionStorage:', err); }
      alert('Veja o console (F12) para detalhes de debug.');
    });

    return;
  }

  // extrai infos
  const { movieId, sessionId, selectedSeats, selectedCombos, totals } = checkoutData;
  const ticketsTotal = totals?.ticketsTotal ?? 0;
  const combosTotal = totals?.combosTotal ?? 0;
  const totalGeral = totals?.totalGeral ?? (ticketsTotal + combosTotal);

  // constrói o HTML da página de pagamento
  const paymentWrapper = document.createElement('div');
  paymentWrapper.className = 'payment-wrapper';

  paymentWrapper.innerHTML = `
    <div class="page-header mb-3">
      <h1>Finalize o Pagamento</h1>
      <p class="text-muted">Pedido para a sessão: <strong>${sessionId || '—'}</strong></p>
    </div>

    <div class="row">
      <div class="col-md-5 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Resumo do Pedido</h5>
            <p><strong>Assentos:</strong></p>
            <p id="payment-assentos-list">
              ${selectedSeats.map(s => `<span class="badge bg-primary me-1">${s}</span>`).join('')}
            </p>

            <p><strong>Snacks:</strong></p>
            <p id="payment-snacks-list">
              ${(selectedCombos && selectedCombos.length) ? selectedCombos.map(c => `<span class="badge bg-warning text-dark me-1">${c.nome} x${c.quantity || 1}</span>`).join('') : '<em>Nenhum snack selecionado</em>'}
            </p>

            <hr>

            <div class="d-flex justify-content-between">
              <span>Ingressos:</span><strong>R$ ${Number(ticketsTotal).toFixed(2)}</strong>
            </div>
            <div class="d-flex justify-content-between mt-2">
              <span>Snacks:</span><strong>R$ ${Number(combosTotal).toFixed(2)}</strong>
            </div>
            <hr>
            <div class="d-flex justify-content-between total-line">
              <strong>Total Geral:</strong><strong>R$ ${Number(totalGeral).toFixed(2)}</strong>
            </div>

          </div>
        </div>
      </div>

      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <form id="payment-form" novalidate>
              <div class="mb-3">
                <label for="cardholder-name" class="form-label">Nome Completo</label>
                <input type="text" class="form-control" id="cardholder-name" placeholder="Nome completo" required>
              </div>

              <div class="mb-3">
                <label for="card-number" class="form-label">Número do Cartão</label>
                <input type="text" class="form-control" id="card-number" placeholder="1234 5678 9012 3456" maxLength="23" required>
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
                    <input type="text" class="form-control" id="cvv" placeholder="123" maxLength="4" required>
                  </div>
                </div>
              </div>
              
              <button type="submit" id="payment-submit-btn" class="btn btn-primary w-100">Finalizar Pagamento</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(paymentWrapper);

  const cardNumberInput = safeQuery(paymentWrapper, '#card-number');
  const expiryInput = safeQuery(paymentWrapper, '#expiry');
  const cvvInput = safeQuery(paymentWrapper, '#cvv');
  const paymentForm = safeQuery(paymentWrapper, '#payment-form');
  const submitBtn = safeQuery(paymentWrapper, '#payment-submit-btn');

  if (!paymentForm) {
    console.error('[payment] form #payment-form não foi encontrado — renderPayment não pode continuar com listeners.');
    const errNote = document.createElement('div');
    errNote.className = 'alert alert-warning mt-3';
    errNote.innerText = 'Erro interno: formulário de pagamento não disponível. Veja o console (F12) para detalhes.';
    paymentWrapper.appendChild(errNote);
    return;
  }

  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
      e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
    });
  } else {
    console.warn('[payment] input #card-number não encontrado');
  }

  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) value = value.substring(0, 4);
      if (value.length >= 3) {
        e.target.value = value.substring(0, 2) + '/' + value.substring(2);
      } else {
        e.target.value = value;
      }
    });
  } else {
    console.warn('[payment] input #expiry não encontrado');
  }

  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  } else {
    console.warn('[payment] input #cvv não encontrado');
  }

  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = safeQuery(paymentWrapper, '#cardholder-name');
    const name = nameEl ? nameEl.value.trim() : '';
    const card = cardNumberInput ? cardNumberInput.value.replace(/\s/g, '') : '';
    const expiry = expiryInput ? expiryInput.value.trim() : '';
    const cvv = cvvInput ? cvvInput.value.trim() : '';

    if (!name || card.length < 13 || expiry.length < 4 || (cvv.length < 3)) {
      alert('Preencha corretamente os campos do cartão.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Processando...';
    }

setTimeout(() => {
    const orderId = 'TW-' + (Date.now()).toString(36).toUpperCase();
    const ticket = {
        orderId,
        movieId: checkoutData.movieId,
        sessionId: checkoutData.sessionId,
        seats: checkoutData.selectedSeats,
        combos: checkoutData.selectedCombos || [],
        totals: checkoutData.totals || {},
        purchasedAt: new Date().toISOString()
    };

    try {
        sessionStorage.removeItem('checkoutData');
        console.log('[payment] checkoutData removido do sessionStorage');
    } catch (err) {
        console.warn('[payment] Erro ao limpar sessionStorage:', err);
    }

    container.innerHTML = `
        <div class="payment-success text-center p-4">
            <h2>Pagamento realizado com sucesso!</h2>
            <p>Seu pedido foi confirmado. Obrigado!</p>

            <div class="mt-3 d-flex gap-2 justify-content-center flex-wrap">
                <button id="download-pdf" class="btn btn-outline-primary">Baixar Ingresso (PDF)</button>
                <button id="to-home" class="btn btn-primary">Voltar para a lista de filmes</button>
            </div>
        </div>
    `;

    const btnPdf = container.querySelector('#download-pdf');
    const btnHome = container.querySelector('#to-home');

    function downloadBlob(content, fileName, mimeType = 'application/octet-stream') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    function ticketToText(t) {
        const lines = [];
        lines.push(`Ordem: ${t.orderId}`);
        lines.push(`Data: ${new Date(t.purchasedAt).toLocaleString()}`);
        lines.push(`Sessão: ${t.sessionId}`);
        lines.push(`Filme ID: ${t.movieId}`);
        lines.push(`Assentos: ${t.seats.join(', ')}`);
        if (t.combos && t.combos.length) {
            lines.push('Snacks:');
            t.combos.forEach(c => {
                lines.push(`  - ${c.nome} x${c.quantity || 1} (R$ ${Number(c.preco || 0).toFixed(2)})`);
            });
        } else {
            lines.push('Snacks: Nenhum');
        }
        const tot = t.totals || {};
        lines.push('');
        lines.push(`Total Ingressos: R$ ${Number(tot.ticketsTotal || 0).toFixed(2)}`);
        lines.push(`Total Snacks: R$ ${Number(tot.combosTotal || 0).toFixed(2)}`);
        lines.push(`Total Geral: R$ ${Number(tot.totalGeral || ((tot.ticketsTotal||0)+(tot.combosTotal||0))).toFixed(2)}`);
        lines.push('');
        lines.push('Apresente este ingresso na entrada (versão eletrônica).');
        return lines.join('\n');
    }

    function loadJsPDF() {
        return new Promise((resolve, reject) => {
            if (window.jspdf && (window.jspdf.jsPDF || window.jsPDF)) {
                return resolve(window.jspdf?.jsPDF || window.jsPDF);
            }

            const src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => {
                const jsPDF = window.jspdf?.jsPDF || (window.jsPDF && window.jsPDF);
                if (jsPDF) return resolve(jsPDF);
                setTimeout(() => {
                    const jsPDF2 = window.jspdf?.jsPDF || (window.jsPDF && window.jsPDF);
                    if (jsPDF2) resolve(jsPDF2);
                    else reject(new Error('jsPDF não disponível após carregar script.'));
                }, 50);
            };
            script.onerror = (e) => reject(e);
            document.head.appendChild(script);
        });
    }

    async function generatePdfAndDownload(ticketObj) {
        try {
            const jsPDFLib = await loadJsPDF();
            const doc = new jsPDFLib({
                unit: 'mm',
                format: 'a4'
            });

            const left = 15;
            let y = 20;
            doc.setFontSize(16);
            doc.text('TicketWave - Ingresso', left, y);
            y += 10;

            doc.setFontSize(11);
            doc.text(`Ordem: ${ticketObj.orderId}`, left, y);
            y += 7;
            doc.text(`Data: ${new Date(ticketObj.purchasedAt).toLocaleString()}`, left, y);
            y += 7;
            doc.text(`Sessão: ${ticketObj.sessionId || '—'}`, left, y);
            y += 7;
            doc.text(`Filme ID: ${ticketObj.movieId || '—'}`, left, y);
            y += 10;

            doc.setFontSize(12);
            doc.text('Assentos:', left, y);
            y += 7;
            doc.setFontSize(11);
            doc.text(ticketObj.seats.join(', '), left + 6, y);
            y += 10;

            doc.setFontSize(12);
            doc.text('Snacks:', left, y);
            y += 7;
            doc.setFontSize(11);
            if (ticketObj.combos && ticketObj.combos.length) {
                ticketObj.combos.forEach(c => {
                    const line = `- ${c.nome} x${c.quantity || 1} (R$ ${Number(c.preco || 0).toFixed(2)})`;
                    doc.text(line, left + 6, y);
                    y += 6;
                    if (y > 270) {
                        doc.addPage();
                        y = 20;
                    }
                });
            } else {
                doc.text('Nenhum', left + 6, y);
                y += 8;
            }

            y += 6;
            doc.setFontSize(11);
            const tot = ticketObj.totals || {};
            doc.text(`Total Ingressos: R$ ${Number(tot.ticketsTotal || 0).toFixed(2)}`, left, y);
            y += 6;
            doc.text(`Total Snacks: R$ ${Number(tot.combosTotal || 0).toFixed(2)}`, left, y);
            y += 6;
            doc.text(`Total Geral: R$ ${Number(tot.totalGeral || ((tot.ticketsTotal||0)+(tot.combosTotal||0))).toFixed(2)}`, left, y);
            y += 12;
            doc.setFontSize(9);
            doc.text('Apresente este ingresso (digital ou impresso) na entrada. Obrigado!', left, y);

            const filename = `ticket-${ticketObj.orderId}.pdf`;
            doc.save(filename);
        } catch (err) {
            console.error('[payment] falha ao gerar PDF com jsPDF:', err);
            const filename = `ticket-${ticketObj.orderId}.json`;
            downloadBlob(JSON.stringify(ticketObj, null, 2), filename, 'application/json');
            alert('Não foi possível gerar o PDF automaticamente. Fiz o download do JSON como fallback.');
        }
    }

    if (btnPdf) {
        btnPdf.addEventListener('click', () => {
            generatePdfAndDownload(ticket);
        });
    }

    if (btnHome) {
        btnHome.addEventListener('click', () => {
            window.location.hash = '#/movies';
        });
    }

}, 1200);
  });
}
