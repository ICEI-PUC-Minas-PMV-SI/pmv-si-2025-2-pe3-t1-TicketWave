state = {
    currentSession: null,
    currentMovieId: null,
    selectedSeats: [],
}

function renderSeatMap(container, encodedParams) {

    let sessionId = null;

    if (!encodedParams) {
        console.warn("SeatMap chamado sem params!");
    } else {
        try {
            const possible = JSON.parse(decodeURIComponent(encodedParams));

            if (possible && typeof possible === 'object' && possible.sessionId) {
                sessionId = possible.sessionId;
            } else if (typeof possible === 'string') {
                sessionId = possible;
            } else {
                sessionId = possible.sessionId || null;
            }
        } catch (err) {
            if (typeof encodedParams === 'string' && encodedParams.trim() !== '') {
                sessionId = encodedParams;
            }
        }
    }

    if (!sessionId) {
        console.warn("SeatMap chamado sem sessionId!");
        window.navigate('movies');
        alert("Erro: Sessão não informada.");
        return;
    }

    state.currentSession = sessionId;
    const session = DataLoader.getSession(sessionId);

    if (!session) {
        console.error("Sessão não encontrada:", sessionId);
        window.navigate('movies');
        alert("Erro: Sessão não encontrada.");
        return;
    }

    state.currentMovieId = session.movieId;

    const currentMovie = DataLoader.getMovie(state.currentMovieId);
    if (!currentMovie) {
        console.error("Filme da sessão não encontrado:", state.currentMovieId);
        window.navigate('movies');
        alert("Erro: Filme não encontrado.");
        return;
    }

    const seatMapContainer = document.createElement('div');
    seatMapContainer.className = 'seat-map-container';

    const goBackButton = getGoBackButton('sessions', { movieId: state.currentMovieId });
    seatMapContainer.appendChild(goBackButton);

    const movieHeader = document.createElement('div');
    movieHeader.innerHTML = getMovieHeader(currentMovie);
    seatMapContainer.appendChild(movieHeader);

    const seatGrid = createSeatGrid();
    seatMapContainer.appendChild(seatGrid);

    const submitButton = document.createElement('div');
    submitButton.className = 'submit-button-container';
    submitButton.innerHTML = `
        <button class="btn btn-outline-primary">Confirmar Seleção</button>
    `;

    submitButton.addEventListener('click', () => {
        const selectedSeats = [...document.querySelectorAll('.seat-selected')]
            .map(btn => btn.dataset.seatNumber);

        const payload = encodeURIComponent(JSON.stringify({
            sessionId: state.currentSession,
            movieId: state.currentMovieId,
            selectedSeats
        }));

        window.location.hash = `#snacks?data=${payload}`;
    });

    seatMapContainer.appendChild(submitButton);
    container.appendChild(seatMapContainer);

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
        seatButton.addEventListener('click', () => {
            toggleSeatAvailable(seatButton);
        });
    });
}

function toggleSeatAvailable(seatButton) {
    if (seatButton.classList.contains('seat-available')) {
        seatButton.classList.remove('seat-available');
        seatButton.classList.add('seat-selected');
    } else if (seatButton.classList.contains('seat-selected')) {
        seatButton.classList.remove('seat-selected');
        seatButton.classList.add('seat-available');
    }
}
