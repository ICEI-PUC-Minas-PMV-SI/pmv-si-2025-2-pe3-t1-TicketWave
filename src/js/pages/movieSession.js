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

  container.innerHTML = '';

  const goBackButton = getGoBackButton('movies');
  container.appendChild(goBackButton);

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
      ${getMovieHeader(movie)}

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

  <div class="comment">
    <p class="comment-text">
      <strong>@CineLover98:</strong> Achei o filme muito melhor do que esperava! A trilha sonora ficou incrível. 🎶
    </p>
    <span class="comment-time">agora mesmo</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@LaraFilmes:</strong> O filme está impecável, mas o final me deixou com mais perguntas do que respostas 😅
    </p>
    <span class="comment-time">5 minutos atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@Joao_Series:</strong> Os atores mandaram bem demais! Especialmente o protagonista, que deu um show. 👏
    </p>
    <span class="comment-time">6 horas atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@MovieGeek22:</strong> História interessante, mas o ritmo podia ser um pouco mais acelerado.
    </p>
    <span class="comment-time">6 horas atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@NinaReis:</strong> Amei! Já quero assistir de novo com meus amigos 😍
    </p>
    <span class="comment-time">1 dia atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@CineCríticoBR:</strong> O roteiro é mediano, mas a direção compensa bastante. Tem potencial!
    </p>
    <span class="comment-time">1 dia atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@PauloRibeiro:</strong> Alguns efeitos ficaram meio forçados, mas ainda assim curti o resultado final.
    </p>
    <span class="comment-time">3 dias atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@AnaFilma:</strong> Que plot twist! Eu literalmente fiquei de boca aberta 😮
    </p>
    <span class="comment-time">2 semanas atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@LucasTavares:</strong> Faltou um pouco de emoção no meio do filme, mas o final salvou.
    </p>
    <span class="comment-time">2 semanas atrás</span>
  </div>

  <div class="comment">
    <p class="comment-text">
      <strong>@SofiaMendes:</strong> Um dos melhores filmes que vi esse ano! História envolvente e atuações perfeitas. 🌟
    </p>
    <span class="comment-time">2 semanas atrás</span>
  </div>

</div>

  `;

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