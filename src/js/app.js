const appState = {
    currentView: 'movies',
    currentParams: null,
};

async function init() {
    try {
        await DataLoader.loadDataIntoLocalStorage();
        renderView(appState.currentView);
        window.addEventListener('hashchange', handleHashChange);
    } catch (error) {
        console.log('Falha ao carregar a aplicação', error);
    }
}

function renderView(view, params) {
    const container = document.getElementById('app-container');

    container.innerHTML = '';

    switch(view){
        case 'movies':
            renderMoviesView(container);
            break;
        case 'sessions':
            renderSessionsView(container, params?.movieId);
            break;
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
