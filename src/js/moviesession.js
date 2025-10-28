function renderSessionsView(container, movieId) {
  const movies = (typeof DataLoader !== 'undefined' && typeof DataLoader.getMovies === 'function')
    ? DataLoader.getMovies()
    : (console.warn('DataLoader.getMovies() não encontrada'), []);

  let sessions = [];
  if (typeof DataLoader !== 'undefined') {
    if (typeof DataLoader.getSessions === 'function') {
      sessions = DataLoader.getSessions();
    } else if (typeof DataLoader.getData === 'function') {
      const data = DataLoader.getData();
      sessions = data && data.sessions ? data.sessions : [];
    }
  }

  if ((!sessions || sessions.length === 0) && window.localStorage) {
    try {
      const raw = localStorage.getItem('ticketwave_data');
      if (raw) {
        const parsed = JSON.parse(raw);
        sessions = parsed.sessions || [];
      }
    } catch (err) {
      console.warn('Erro ao ler localStorage ticketwave_data:', err);
    }
  }

  const movie = movies.find(m => m.id === movieId);
  if (!movie) {
    console.error("Filme não encontrado:", movieId);
    container.innerHTML = `<p class="text-danger">Filme não encontrado.</p>`;
    return;
  }

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
  goBackButton.addEventListener('click', () => window.navigate && window.navigate('movies'));

  const sessionContainer = document.createElement('div');
  sessionContainer.className = 'session-container container';

  const movieSessions = (sessions || []).filter(s => s.movieId === movieId);
  if (!movieSessions.length) {
    console.warn('Nenhuma sessão encontrada para', movieId);
  }

  const sessionsByDate = movieSessions.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = [];
    acc[s.date].push(s);
    return acc;
  }, {});

  const sortedDates = Object.keys(sessionsByDate)
    .map(d => ({ raw: d, time: new Date(d).getTime() }))
    .filter(x => !isNaN(x.time)) 
    .sort((a, b) => a.time - b.time)
    .map(x => x.raw);

  if (sortedDates.length === 0) {
    const fallbackDates = Object.keys(sessionsByDate);
    if (fallbackDates.length) {
      sortedDates.push(...fallbackDates);
    }
  }

  const dateTabsHTML = sortedDates.map((date, index) => {
    const dateObj = new Date(date);
    const weekday = !isNaN(dateObj) ? dateObj.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase() : '';
    const formatted = !isNaN(dateObj) ? dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : date;
    const activeClass = index === 0 ? 'active' : '';
    return `
      <li class="nav-item">
        <button class="nav-link ${activeClass}" data-bs-toggle="pill" data-bs-target="#mv_${movieId}_date_${index}">
          ${weekday} ${formatted}
        </button>
      </li>
    `;
  }).join('');

const tabContentsHTML = sortedDates.map((date, index) => {
    const activeClass = index === 0 ? 'show active' : '';
    const items = (sessionsByDate[date] || [])
      .sort((a,b) => a.time.localeCompare(b.time))
      .map(s => `
        <button class="horario btn btn-outline-primary me-2 mb-2" data-session-id="${s.id}">
          ${s.time}
        </button>
      `).join('') || '<p class="text-muted">Nenhum horário para esta data.</p>';

    return `
      <div class="tab-pane fade ${activeClass}" id="mv_${movieId}_date_${index}">
        <div class="session-times">${items}</div>
      </div>
    `;
  }).join('');

  sessionContainer.innerHTML = `
    <div class="movie-session-wrapper">

      <!-- Cabeçalho do filme -->
      <div class="movie-session-header d-flex flex-column flex-md-row align-items-start gap-4 mb-5">
        <div class="movie-poster-col">
          <a href="${movie.trailer}" target="_blank" class="poster-link">
            <img src="${movie.poster}" alt="${movie.titulo}" class="movie-poster-big rounded shadow">
            <div class="play-overlay"><i class="bi bi-play-circle-fill"></i></div>
          </a>
        </div>

        <div class="movie-info-col">
          <h2 class="fw-bold mb-2">${movie.titulo}</h2>
          <p class="text-muted mb-2"><i class="bi bi-clock"></i> ${durationText}</p>
          <p class="text-muted mb-3"><i class="bi bi-film"></i> ${movie.genero}</p>
          <p class="mb-3 rating" style="background-color: ${ratingColor}; color: white; padding: 2px 6px; border-radius: 4px;">${movie.rating}</p>
          <p class="movie-synopsis">${movie.sinopse}</p>
        </div>
      </div>

      <!-- Datas -->
      <div class="movie-session-dates mb-4">
        <h5 class="fw-bold mb-3">Escolha a data</h5>
        <ul class="nav nav-pills gap-2 flex-wrap" id="pills-tab" role="tablist">
          ${dateTabsHTML || '<li class="nav-item"><span class="text-muted">Sem datas disponíveis</span></li>'}
        </ul>
      </div>

      <!-- Horários -->
      <div class="tab-content" id="pills-tabContent">
        ${tabContentsHTML || '<div class="text-muted">Sem horários disponíveis</div>'}
      </div>
    </div>

      <!-- Comentários -->
      <div class="comments-container">
      <h6 class="fw-bold mb-3">35 comentários</h6>
      <div class="comment-box">
      <label for="comment" class="form-label">Adicione um comentário...</label>
      <textarea id="comment" class="form-control" rows="3"></textarea>
      </div>
      <div class="comment-list">
      <p>User123</p>
      </div>
      </div>
  `;

  container.appendChild(goBackButton);
  container.appendChild(sessionContainer);

  sessionContainer.querySelectorAll('.horario').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget;
      const sessionId = el.dataset.sessionId;
      if (window.navigate) {
        try {
          window.navigate('seatmap', { sessionId });
        } catch (err) {
          window.navigate('seatmap');
          console.warn('window.navigate falhou com payload; chamando sem payload. Error:', err);
          localStorage.setItem('selected_session_id', sessionId || '');
        }
      } else {
        localStorage.setItem('selected_session_id', sessionId || '');
        console.info('window.navigate não definida. sessionId gravado em localStorage:selected_session_id');
      }
    });
  });

  console.debug('renderSessionsView -> movieSessions:', movieSessions);
}