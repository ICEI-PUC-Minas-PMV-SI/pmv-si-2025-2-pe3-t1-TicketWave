
const DataLoader = (function () {

    const DATA_STORAGE_KEY = 'ticketwave_data';

    
    async function hashPassword(password) {
        const enc = new TextEncoder();
        const data = enc.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    
    function saveData(data) {
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
    }

    
    function retrieveData() {
        const dataString = localStorage.getItem(DATA_STORAGE_KEY);
        try {
            
            const data = JSON.parse(dataString);
            
            return {
                movies: data.movies || [],
                sessions: data.sessions || [],
                users: data.users || [] 
            };
        } catch (e) {
          
            return { movies: [], sessions: [], users: [] };
        }
    }

    async function loadDataIntoLocalStorage() {
        const response = await fetch('data/database.json');
        const dataFromFile = await response.json();
        
        const existingData = retrieveData();

        const newData = {
            movies: dataFromFile.movies || [],
            sessions: dataFromFile.sessions || [],
            users: dataFromFile.users || existingData.users || []
        };
        
        saveData(newData);
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

    function getUsers() {
        const data = retrieveData();
        return data.users;
    }

    function findByEmail(email) {
        const users = getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    async function registerUser({ nome, email, senha }) {
        const data = retrieveData(); 

        if (data.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error('Email já cadastrado');
        }

        const senhaHash = await hashPassword(senha); 
        const user = {
            id: Date.now().toString(),
            nome,
            email,
            senhaHash
        };

        data.users.push(user); 
        saveData(data); 

        return user;
    }


    return {
        loadDataIntoLocalStorage: loadDataIntoLocalStorage,
        getMovies: getMovies,
        getSessions: getSessions,
        registerUser: registerUser,
        findByEmail: findByEmail,
        getUsers: getUsers
    };

})();

window.DataLoader = DataLoader;