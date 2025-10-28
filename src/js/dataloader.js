const DataLoader = (function () {

    const DATA_STORAGE_KEY = 'ticketwave_data';

    async function loadDataIntoLocalStorage() {
        try {
            const response = await fetch('data/database.json');
            const data = await response.json();
            localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            return false;
        }
    }

    function getMovies() {
        const data = retrieveData();
        return data.movies || [];
    }

    function getSessions(movieId) {
        const data = retrieveData();
        return (data.sessions || []).filter(session => session.movieId === movieId);
    }

    function getSession(sessionId) {
        const data = retrieveData();
        const sessions = (data.sessions || []).filter(session => session.id == sessionId);
        if (!sessions || sessions.length === 0) {
            console.error(`No session found for ${sessionId}`);
            return null;
        }
        return sessions[0];
    }

    function retrieveData() {
        const dataString = localStorage.getItem(DATA_STORAGE_KEY);
        if (!dataString) return { movies: [], sessions: [] };
        try {
            return JSON.parse(dataString);
        } catch (error) {
            console.error("Erro ao parsear os dados do localStorage:", error);
            return { movies: [], sessions: [] };
        }
    }

    function getComments() {
        const data = retrieveData();
        return data.comments || [];
    }

    function addComment(comment) {
        const data = retrieveData();
        if (!data.comments) data.comments = [];
        data.comments.push(comment);
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    }

    return {
        loadDataIntoLocalStorage,
              getMovies,
        getSessions,
        getSession,
        getComments,
        addComment
    };

})();
