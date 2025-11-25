const appState = {
    currentView: 'movies',
    currentParams: null,
};

async function init() {
    try {
        await DataLoader.loadDataIntoLocalStorage();
        window.addEventListener('hashchange', handleHashChange);
        Utils.addNavbarListeners();
        handleHashChange();
    } catch (error) {
        console.log('Falha ao carregar a aplicação', error);
    }
}

function renderView(view, params) {
    console.log(`rendering view "${view}" with params:`);
    const container = document.getElementById('app-container');

    container.innerHTML = '';

    switch(view){
        case 'movies':
            renderMoviesView(container);
            break;
        case 'sessions':
            renderSessionsView(container, params?.movieId);
            break;
        case 'seatmap':
            renderSeatMap(container, params?.sessionId);
            break;
        case 'checkout':
            renderCheckout(container, params?.movieId, params?.sessionId);
            break;
        case 'payment':
            renderPayment(container, params);
            break;
        case 'cinemas':
            renderCinemasView(container);
            break; 
        case 'snacks':
            renderCinemasView(container);
            break;           
        default:
            renderMoviesView(container);
    }
}

function handleHashChange() {
    const hash = window.location.hash.slice(1);
    const [view, paramsString] = hash.split('?');

    const params = {};
    if (paramsString) {
        const urlParams = new URLSearchParams(paramsString);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
    }

    const targetView = view || 'movies';

    appState.currentView = targetView;
    appState.currentParams = params;

    renderView(targetView, params);
}

function navigate(view, params = {}) {
    let hash = `#${view}`;

    const paramKeys = Object.keys(params);
    if (paramKeys.length > 0) {
        const urlParams = new URLSearchParams(params);
        hash += `?${urlParams.toString()}`;
    }

    window.location.hash = hash;
}

window.navigate = navigate;

init();

document.addEventListener("DOMContentLoaded", () => {

    // Em Cartaz
    document.getElementById("navbar-on-display").addEventListener("click", (e) => {
        e.preventDefault();
        ensureHomeAndScroll("on-display-header");
    });

    // Em Alta
    document.getElementById("navbar-trending").addEventListener("click", (e) => {
        e.preventDefault();
        ensureHomeAndScroll("trending-header");
    });

    // Sugestões
    document.getElementById("navbar-suggestion").addEventListener("click", (e) => {
        e.preventDefault();
        ensureHomeAndScroll("suggestion-header");
    });
});

function ensureHomeAndScroll(targetId) {
    if (window.currentPage !== "home") {
        window.navigate("home");
        
        setTimeout(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
    } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
}

