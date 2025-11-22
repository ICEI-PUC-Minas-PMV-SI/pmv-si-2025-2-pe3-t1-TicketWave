const searchInput = document.querySelector("#search-input");

const Utils = ( function () {

    async function hashPassword(password) {
        const enc = new TextEncoder();
        const data = enc.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function addNavbarListeners() {
        const navbarTrendingLink = document.querySelector('#navbar-trending');
        navbarTrendingLink.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#trending-header').scrollIntoView({ behavior: 'smooth' });
        });

        const navbarOnDisplayLink = document.querySelector('#navbar-on-display');
        navbarOnDisplayLink.addEventListener('click', (e) => {
            e.preventDefault();

            document.querySelector('#on-display-header').scrollIntoView({ behavior: 'smooth' });
        });
    }

        return {
        hashPassword,
        addNavbarListeners,
    };
})();    

function searchMovies(searchTerm) {
    const allMovies = DataLoader.getMovies();

    const results = allMovies.filter(movie =>
        movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = document.getElementById("app-container");

    if (searchTerm.trim() !== "") {
        container.innerHTML = `
            <h2 class="text-center mb-4">Resultados da Busca</h2>
        `;

        const grid = document.createElement('div');
        grid.className = 'row g-4';

        results.forEach(movie => {
            const movieCard = createMovieCard(movie);
            grid.appendChild(movieCard);
        });

        container.appendChild(grid);
        return;
    }

    renderMoviesView(container);
}

const utils = (function () {

  async function hashPassword(password) {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function addNavbarListeners() {
    const navbarTrendingLink = document.querySelector('#navbar-trending');
    const navbarOnDisplayLink = document.querySelector('#navbar-on-display');

    if (navbarTrendingLink) {
      navbarTrendingLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#trending-header');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (navbarOnDisplayLink) {
      navbarOnDisplayLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#on-display-header');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  return {
    hashPassword,
    addNavbarListeners,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle") ||
                       document.querySelector(".navbar-right .bi-search") ||
                       document.querySelector(".bi-search");
  const searchInput = document.getElementById("search-input");
  const navbarRight = document.querySelector(".navbar-right");

  if (!searchToggle || !searchInput) {
    console.warn("Search toggle or input not found. Selector used: #search-toggle / .navbar-right .bi-search / .bi-search and #search-input");
    return;
  }

  searchInput.addEventListener("click", (e) => e.stopPropagation());

  function showSearch() {
    searchInput.classList.remove("hide");
    setTimeout(() => searchInput.focus(), 50);
    setTimeout(() => {
      document.addEventListener("click", outsideClickListener);
      document.addEventListener("keydown", escKeyListener);
    }, 0);
  }

  function hideSearch() {
    searchInput.classList.add("hide");
    document.removeEventListener("click", outsideClickListener);
    document.removeEventListener("keydown", escKeyListener);
  }

  function outsideClickListener(e) {
    if (navbarRight && navbarRight.contains(e.target)) return;
    hideSearch();
  }

  function escKeyListener(e) {
    if (e.key === "Escape") hideSearch();
  }

  searchToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (searchInput.classList.contains("hide")) showSearch();
    else hideSearch();
  });
});


window.searchMovies = searchMovies;


