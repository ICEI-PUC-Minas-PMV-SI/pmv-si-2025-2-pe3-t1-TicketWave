const RATING_COLORS = {
    'L': '#009a44',
    '10': '#0091d8',
    '12': '#e1c400',
    '14': '#f26522',
    '16': '#e4002b',
    '18': '#231f20'
};

function getMovieHeader(movie) {
    console.log(movie);

    const hours = Math.floor(movie.duracao / 60);
    const minutes = movie.duracao % 60;
    const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    const ratingColor = RATING_COLORS[movie.rating] || '#777';
    return `
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
    `
}

function getGoBackButton(pageToGoBack, params) {
    const goBackButton = document.createElement('div');
    goBackButton.className = 'mb-5';
    goBackButton.innerHTML = `
        <button class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left"></i> Voltar
        </button>
    `;
    goBackButton.addEventListener('click', () => { window.navigate(pageToGoBack, params) });
    return goBackButton;
}