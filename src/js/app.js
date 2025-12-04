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
    const navbar = document.getElementById('main-navbar');
    const footer = document.getElementById('main-footer');

    const hideLayout = (view === 'login' || view === 'register');

    if (hideLayout) {
        navbar.style.display = "none";
        footer.style.display = "none";
        document.body.style.backgroundColor = "#f8f9fa";
    } else {
        navbar.style.display = "";
        footer.style.display = "";
        document.body.style.backgroundColor = "";
    }

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
            renderCheckout(container, params?.data);
             break;
        case 'payment':
            renderPayment(container, params);
            break;
        case 'cinemas':
            renderCinemasView(container);
            break; 
        case 'snacks':
            Snacks.render(container, params?.data);
            break;
        case 'login':
             renderLoginView(container);
            break;
        case 'register':
            renderRegisterView(container);
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

function getGoBackButton(targetView, params = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-outline-secondary go-back-button';
    btn.setAttribute('aria-label', 'Voltar');
    btn.innerHTML = `&larr; Voltar`;

    const normalizedParams = { ...params };
    if (normalizedParams.hasOwnProperty('data')) {
        if (typeof normalizedParams.data !== 'string') {
            try {
                normalizedParams.data = encodeURIComponent(JSON.stringify(normalizedParams.data));
            } catch (e) {
                console.warn('getGoBackButton: falha ao codificar params.data', e);
                delete normalizedParams.data;
            }
        }
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (typeof window.navigate === 'function') {
            try {
                window.navigate(targetView, normalizedParams);
                return;
            } catch (err) {
                console.warn('window.navigate falhou, caindo para construção manual da hash', err);
            }
        }

        let hash = `#${targetView}`;
        const pkeys = Object.keys(normalizedParams);
        if (pkeys.length) {
            const urlParams = new URLSearchParams();
            pkeys.forEach(k => {
                urlParams.set(k, normalizedParams[k]);
            });
            hash += `?${urlParams.toString()}`;
        }
        window.location.hash = hash;
    });

    return btn;
}
