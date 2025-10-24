
const DataLoader = (function () {

    DATA_STORAGE_KEY = 'ticketwave_data'

    async function loadDataIntoLocalStorage() {
        const response = await fetch('data/database.json');
        const data = await response.json();
        const dataString = JSON.stringify(data);

        localStorage.setItem(DATA_STORAGE_KEY, dataString);
        return true;
    }

    function getMovies() {
        const data = retrieveData();
        return data.movies;
    }

    function getSessions(movieId) {
        const data = retrieveData();
        return data.sessions.filter(session => session.movieId === movieId);
    }

    function getSession(sessionId) {
        const data = retrieveData();
        const sessions = data.sessions.filter(session => session.id == sessionId);
        if (!sessions || sessions.length === 0) {
            console.error(`No session fouind for ${sessionId}`);
        }
        return sessions[0];
    }

    function retrieveData() {
        const data = localStorage.getItem(DATA_STORAGE_KEY);
        return JSON.parse(data);
    }

    return {
        loadDataIntoLocalStorage: loadDataIntoLocalStorage,
        getMovies: getMovies,
        getSessions: getSessions,
        getSession: getSession,
    };

})();
