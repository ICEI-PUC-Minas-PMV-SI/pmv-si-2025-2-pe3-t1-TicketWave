
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
    console.log("Retrieved data:", data);
    return data.movies;
}

function retrieveData() {
    const data = localStorage.getItem(DATA_STORAGE_KEY);
    return JSON.parse(data);
}
