const appState = {
    currentView: 'movies'
};

async function init() {
    try {
        await loadDataIntoLocalStorage();
        renderView(appState.currentView);
    } catch (error) {
        console.log('Falha ao carregar a aplicação', error);
    }
}

function renderView(view) {
    const container = document.getElementById('app-container');

    container.innerHTML = '';

    if (view === 'movies') {
        renderMoviesView(container);
    }
}

init();
