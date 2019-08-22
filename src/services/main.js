import axios from 'axios';
const OMDB_KEY = 22830780

export default {
    getMovies,
    getMovieImg,
    saveToStorage,
    loadFromStorage
}

function getMovies() {

    return axios.get('https://swapi.co/api/films/')
        .then(function (response) {
            var movies = response.data.results
            var moviesWithPoster = movies.map(movie => {
                return getMovieImg(movie.title).then(function (res) {
                    movie.posterUrl = res;
                    return movie;
                })
            })
            return Promise.all(moviesWithPoster);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getMovieImg(movieTitle) {
    return axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${OMDB_KEY}`)
        .then(function (response) {
            return response.data.Poster;
        })
        .catch(function (error) {
            console.log(error);
        })
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}