state = {
    currentSession: null,
    selectedSeats: [],
}

function renderSeatMap(container, sessionId) {
    state.currentSession = sessionId;

    
    if (!state.currentSession) {
        window.navigate('movies');
        alert("Erro: Sessão Não Encontrada");
    }

    const goBackButton = document.createElement('div');
    goBackButton.className = 'mb-3';
    goBackButton.innerHTML = `
            <button class="btn btn-secondary">
                ← Voltar aos Filmes
            </button>
    `;
    goBackButton.addEventListener('click', () => { window.navigate('movies') });

    container.appendChild(goBackButton);

    // TODO: Implement Session Header with movie card
    // container.appendChild

    const seatGrid = createSeatGrid();
    container.appendChild(seatGrid);
    addEventListeners();
}

function createSeatGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'seat-grid-container card mb-4';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const screen = document.createElement('div');
    screen.className = 'screen-indicator mb-4';
    screen.innerHTML = '<div class="screen-label">TELA</div>';
    cardBody.appendChild(screen);

    const grid = document.createElement('div');
    grid.className = 'seat-grid';

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 10;

    rows.forEach(rowLetter => {
        const row = document.createElement('div');
        row.className = 'seat-row';

        const rowLabel = document.createElement('div');
        rowLabel.className = 'seat-row-label';
        rowLabel.textContent = rowLetter;
        row.appendChild(rowLabel);

        const seatsContainer = document.createElement('div');
        seatsContainer.className = 'seat-row-seats';

        for (let i = 1; i <= seatsPerRow; i++) {
            const seatNumber = `${rowLetter}${i}`;
            
            const seatButton = document.createElement('button');
            seatButton.className = `seat-btn seat-available`;
            seatButton.setAttribute('data-seat-number', seatNumber);
            seatButton.setAttribute('type', 'button');
            seatButton.setAttribute('aria-label', `Seat ${seatNumber}`);

            seatButton.innerHTML = `<span class="seat-number">${i}</span>`;
            seatsContainer.appendChild(seatButton);
        }

        row.appendChild(seatsContainer);
        grid.appendChild(row);
    });

    cardBody.appendChild(grid);
    gridContainer.appendChild(cardBody);

    return gridContainer;
}

function addEventListeners() {
    const seatButtons = document.querySelectorAll('.seat-btn:not([disabled])');
    seatButtons.forEach(seatButton => {
      seatButton.addEventListener('click', (e) => {
        seatButton.classList.remove('seat-available');
        seatButton.classList.add('seat-selected');
      });
    });
}
