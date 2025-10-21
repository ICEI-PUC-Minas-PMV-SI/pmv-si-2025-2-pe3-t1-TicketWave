function renderSessionsView(container, movieId) {
    const movies = DataLoader.getMovies();
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return console.error("Filme não encontrado:", movieId);

    const goBackButton = document.createElement('div');
    goBackButton.className = 'mb-3';
    goBackButton.innerHTML = `
            <button class="btn btn-secondary">
                ← Voltar aos Filmes
            </button>
    `;
    goBackButton.addEventListener('click', () => { window.navigate('movies') });

    const sessionContainer = document.createElement('div');
    sessionContainer.className = 'session-container';
    sessionContainer.innerHTML = `
      <div class="row d-flex align-items-start justify-content-center movie-session-layout">
        <!-- Poster -->
        <div class="col-md-4 d-flex justify-content-center">
          <div class="movie-card1">
            <div class="movie-poster1">
              <img src="${movie.poster}" alt="Poster do filme ${movie.titulo}">
            </div>
          </div>
        </div>

        <!-- Datas e horários -->
        <div class="col-md-6 text-start">
          <div class="dias-disponiveis">
            <ul class="nav nav-pills mb-3 d-flex" id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="data1-tab" data-bs-toggle="pill" data-bs-target="#data1" type="button">QUA 14/11</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="data2-tab" data-bs-toggle="pill" data-bs-target="#data2" type="button">QUI 15/11</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="data3-tab" data-bs-toggle="pill" data-bs-target="#data3" type="button">SEX 16/11</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="data4-tab" data-bs-toggle="pill" data-bs-target="#data4" type="button">SÁB 17/11</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="data5-tab" data-bs-toggle="pill" data-bs-target="#data5" type="button">DOM 18/11</button>
              </li>
            </ul>
          </div>

          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="data1" role="tabpanel" aria-labelledby="data1-tab">
              <div class="row d-flex justify-content-start">
                <button class="horario">10:25</button>
                <button class="horario">17:30</button>
              </div>
            </div>

            <div class="tab-pane fade" id="data2" role="tabpanel" aria-labelledby="data2-tab">
              <div class="row d-flex justify-content-start">
                <button class="horario">14:15</button>
                <button class="horario">14:30</button>
                <button class="horario">19:25</button>
              </div>
            </div>

            <div class="tab-pane fade" id="data3" role="tabpanel" aria-labelledby="data3-tab">
              <div class="row d-flex justify-content-start">
                <button class="horario">14:15</button>
                <button class="horario">14:30</button>
                <button class="horario">19:25</button>
              </div>
            </div>

            <div class="tab-pane fade" id="data4" role="tabpanel" aria-labelledby="data4-tab">
              <div class="row d-flex justify-content-start">
                <button class="horario">10:00</button>
                <button class="horario">11:30</button>
                <button class="horario">19:25</button>
              </div>
            </div>

            <div class="tab-pane fade" id="data5" role="tabpanel" aria-labelledby="data5-tab">
              <div class="row d-flex justify-content-start">
                <button class="horario">11:00</button>
                <button class="horario">14:00</button>
                <button class="horario">16:00</button>
                <button class="horario">18:00</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(goBackButton);
    container.appendChild(sessionContainer);

    if (typeof initializeButtons === "function") {
        initializeButtons();
    }

    const horarioButtons = sessionContainer.querySelectorAll('.horario');
    horarioButtons.forEach(button => {
        button.addEventListener('click', () => window.navigate('seatmap'));
    });

}
