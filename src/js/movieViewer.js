
function renderMoviesView(container) {
    const movies = getMovies();

    const movieGrid = document.createElement('div');
    movieGrid.className = 'row g-4';
    movieGrid.id = 'movie-grid';

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieGrid.appendChild(movieCard);
    });

    container.innerHTML = `
        <div class="mb-4">
            <h2 class="text-center mb-4">Em Cartaz</h2>
        </div>
    `;
    container.appendChild(movieGrid);
}

function createMovieCard(movie) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    const card = document.createElement('div');
    card.className = 'card movie-card h-100';
    card.setAttribute('data-movie-id', movie.id);

    // TODO: Add rating badge to the movies

    const hours = Math.floor(movie.duracao / 60);
    const minutes = movie.duracao % 60;
    const durationText = hours > 0
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;
    
    card.innerHTML = `
        <div class = "position-relative">
            <img src="${movie.poster}" class="card-img-top movie-poster" alt="${movie.titulo}">
            <div class="position-absolute top-0 end-0 m-2">
            </div>
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
    `
    col.appendChild(card);
    return col;
}