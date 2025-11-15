const trendingIds = ["filme9", "filme10", "filme11", "filme12"];

function renderMoviesView(container) {
    const movies = DataLoader.getMovies();

    const trendingMovies = movies.filter(movie => trendingIds.includes(movie.id));
    const regularMovies = movies.filter(movie => !trendingIds.includes(movie.id));

    container.innerHTML = '';

    const cartazTitle = document.createElement('div');
    cartazTitle.className = "mb-4";
    cartazTitle.innerHTML = `<h2 id="on-display-header" class="text-center mb-4">Em Cartaz</h2>`;
    container.appendChild(cartazTitle);

    const cartazGrid = document.createElement('div');
    cartazGrid.className = 'row g-4 mb-5';

    regularMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        cartazGrid.appendChild(movieCard);
    });

    container.appendChild(cartazGrid);
    const altaTitle = document.createElement('div');
    altaTitle.className = "mb-4 mt-5";
    altaTitle.innerHTML = `<h2 id="trending-header" class="text-center mb-4">Em Alta</h2>`;
    container.appendChild(altaTitle);

    const altaGrid = document.createElement('div');
    altaGrid.className = 'row g-4';

    trendingMovies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        altaGrid.appendChild(movieCard);
    });

    container.appendChild(altaGrid);

    addButtonEventListeners();
}

function createMovieCard(movie) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card movie-card h-100';
    card.setAttribute('data-movie-id', movie.id);

    const hours = Math.floor(movie.duracao / 60);
    const minutes = movie.duracao % 60;
    const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    const isTrending = trendingIds.includes(movie.id);

    card.innerHTML = `
        <div class="position-relative">
            <img src="${movie.poster}" class="card-img-top movie-poster" alt="${movie.titulo}">
            ${isTrending ? `
                <span class="badge bg-danger position-absolute top-0 start-0 m-2"
                      style="font-size: 0.85rem; padding: 6px 10px;">
                    Em Alta
                </span>
            ` : ''}
        </div>
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${movie.titulo}</h5>
            <p class="card-text text-muted mb-2">
                <small>${movie.genero} • ${durationText}</small>
            </p>
            <button class="btn btn-primary mt-auto" data-movie-id="${movie.id}">
                Ver Sessões
            </button>
        </div>
    `;

    col.appendChild(card);
    return col;
}

function addButtonEventListeners() {
    const viewSessionButtons = document.querySelectorAll('.btn.btn-primary');
    viewSessionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = button.getAttribute('data-movie-id');
            window.navigate('sessions', { movieId });
        });
    });
}

window.renderMoviesView = renderMoviesView;
window.addButtonEventListeners = addButtonEventListeners;
