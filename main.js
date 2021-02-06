import createCardMovie from './card.js';

function getAuthToken() {
  fetch(`${baseMovieDBURL}authentication/token/new?api_key=${APIKEY}`)
    .then((r) => r.json())
    .then((data) => requestToken = data.request_token)
  getPopularMovies();
  getPopularSeries();
  getTopRatedMovies();
  getTopRatedSeries();
}

function getPopularMovies() {
  fetch(`${baseMovieDBURL}movie/popular?api_key=${APIKEY}&language=en-US&page=1`)
    .then((r) => r.json())
    .then((data) => getMovieInfo(data.results, wrapperPopMovies))
}

function getPopularSeries(){
  fetch((`${baseMovieDBURL}tv/popular?api_key=${APIKEY}&language=en-US&page=1`))
    .then((r) => r.json())
    .then((data) => getMovieInfo(data.results, wrapperPopTv))
}

function getTopRatedMovies() {
  fetch(`${baseMovieDBURL}movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`)
    .then((r) => r.json())
    .then((data) => getMovieInfo(data.results, wrapperTopRatedMovies))
}

function getTopRatedSeries() {
  fetch(`${baseMovieDBURL}tv/top_rated?api_key=${APIKEY}&language=en-US&page=1`)
    .then((r) => r.json())
    .then((data) => getMovieInfo(data.results, wrapperTopRatedSeries))
}

// If the description is too long split and add three full stops
function limitDescriptionLength(data) {
  if (data.length >= 104) return data.substr(0, 104)+' ...';
  else return data
}

// Init
const state = {
  baseMovieDBURL: 'https://api.themoviedb.org/3/',
  APIKEY: '3e097ab0145d7f55f3ad142f59498fb7',
  requestToken: null,
  sessionID: null,
}

let { baseMovieDBURL, APIKEY, requestToken } = state;
window.addEventListener('load', getAuthToken(), { once: true });

const wrapperPopMovies = document.querySelector('.wrapperPopMovies');
const wrapperPopTv = document.querySelector('.wrapperPopTv');
const wrapperTopRatedMovies = document.querySelector('.wrapperTopMovies');
const wrapperTopRatedSeries = document.querySelector('.wrapperTopSeries');

function getMovieInfo(moviesList, parent) {
  moviesList.map((movie) => {
    const movieInfo = {
      img: `https://www.themoviedb.org/t/p/w342` + movie.poster_path,
      title: movie.title || movie.name,
      link: 'http://google.com',
      addWatchList: 'http://google.com',
      hideIt: 'http://google.com',
      description: limitDescriptionLength(movie.overview),
    }
    const { img, title, link, addWatchList, hideIt, description } = movieInfo;

    createCardMovie(img, title, description, addWatchList, hideIt, link, parent);
  }) 
}


// CAROSELLO BTN
const flowMoviesRight = (e) => {
  console.log(e)
  e.path[2].children[2].scrollBy(-400, 0);
}
const flowMoviesLeft = (e) => e.path[2].children[2].scrollBy(400, 0);
// const flowMoviesRight = () => window.scrollBy(-500, 0);
// const flowMoviesLeft = () => window.scrollBy(500, 0);

const caroselloBtnRight = document.querySelectorAll('.caroselloBtn__buttonRight');
const caroselloBtnLeft = document.querySelectorAll('.caroselloBtn__buttonLeft');

caroselloBtnRight.forEach((btn) => btn.addEventListener('click', flowMoviesRight));
caroselloBtnLeft.forEach((btn) => btn.addEventListener('click', flowMoviesLeft));
