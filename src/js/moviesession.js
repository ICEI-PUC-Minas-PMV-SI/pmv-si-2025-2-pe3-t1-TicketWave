function renderSessionsView(container, movieId) {
  const movies = DataLoader.getMovies();
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return console.error("Filme não encontrado:", movieId);

  const hours = Math.floor(movie.duracao / 60);
  const minutes = movie.duracao % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const ratingColors = {
  'L': '#009a44',
  '10': '#0091d8',
  '12': '#e1c400',
  '14': '#f26522',
  '16': '#e4002b',
  '18': '#231f20'
};

const ratingColor = ratingColors[movie.rating] || '#777'; 


  container.innerHTML = '';

  const goBackButton = document.createElement('div');
  goBackButton.className = 'mb-4';
  goBackButton.innerHTML = `
    <button class="btn btn-outline-secondary">
      <i class="bi bi-arrow-left"></i> Voltar
    </button>
  `;
  goBackButton.addEventListener('click', () => window.navigate('movies'));

  const sessionContainer = document.createElement('div');
  sessionContainer.className = 'session-container container';

  sessionContainer.innerHTML = `
    <div class="movie-session-wrapper">

      <!-- Seção do filme -->
      <div class="movie-session-header d-flex flex-column flex-md-row align-items-start gap-4 mb-5">
      <div class="movie-poster-col">
        <a href="${movie.trailer}" target="_blank">
          <img src="${movie.poster}" alt="${movie.titulo}" class="movie-poster-big rounded shadow">
        </a>
      </div>

        <div class="movie-info-col">
          <h2 class="fw-bold mb-2">${movie.titulo}</h2>
          <p class="text-muted mb-2"><i class="bi bi-clock"></i> ${durationText}</p>
          <p class="text-muted mb-3"><i class="bi bi-film"></i> ${movie.genero}</p>
          <p class="mb-3 rating" style="background-color: ${ratingColor}; color: white; padding: 2px 6px; border-radius: 4px;"">${movie.rating}</p>
          <p class="movie-synopsis">${movie.sinopse}</p>
        </div>
      </div>

      <!-- Seção de datas -->
      <div class="movie-session-dates mb-4">
        <h5 class="fw-bold mb-3">Escolha a data</h5>
        <ul class="nav nav-pills gap-2 flex-wrap" id="pills-tab" role="tablist">
          <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#data1">QUI 23/10</button></li>
          <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#data2">SEX 24/10</button></li>
          <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#data3">SÁB 25/10</button></li>
          <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#data4">DOM 26/10</button></li>
          <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#data5">SEG 27/10</button></li>
        </ul>
      </div>

      <!-- Seção de horários -->
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="data1">
          <div class="session-times">
            <button class="horario">10:25</button>
            <button class="horario">17:30</button>
          </div>
        </div>
        <div class="tab-pane fade" id="data2">
          <div class="session-times">
            <button class="horario">14:15</button>
            <button class="horario">19:25</button>
          </div>
        </div>
        <div class="tab-pane fade" id="data3">
          <div class="session-times">
            <button class="horario">10:00</button>
            <button class="horario">18:45</button>
          </div>
        </div>
        <div class="tab-pane fade" id="data4">
          <div class="session-times">
            <button class="horario">11:30</button>
            <button class="horario">20:00</button>
          </div>
        </div>
        <div class="tab-pane fade" id="data5">
          <div class="session-times">
            <button class="horario">14:00</button>
            <button class="horario">16:00</button>
            <button class="horario">18:00</button>
          </div>
        </div>
      </div>

    </div>
  `;

  container.appendChild(goBackButton);
  container.appendChild(sessionContainer);

  sessionContainer.querySelectorAll('.horario').forEach(btn => {
    btn.addEventListener('click', () => window.navigate('seatmap'));
  });
}
