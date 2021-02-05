function getAuthToken() {
  fetch(`${baseMovieDBURL}authentication/token/new?api_key=${APIKEY}`)
    .then((r) => r.json())
    .then((data) => requestToken = data.request_token)
  getPopularMovies();
}

function getPopularMovies() {
  fetch(`${baseMovieDBURL}movie/popular?api_key=${APIKEY}&language=en-US&page=1`)
    .then((r) => r.json())
    .then((data) => getMovieInfo(data.results))
}

// Init
const state = {
  baseMovieDBURL: 'https://api.themoviedb.org/3/',
  APIKEY: '3e097ab0145d7f55f3ad142f59498fb7',
  requestToken: null,
  sessionID: null,
}

let { baseMovieDBURL, APIKEY, requestToken } = state;
window.addEventListener('load', getAuthToken());

const wrapperMovies = document.querySelector('.wrapperMovies');


function getMovieInfo(moviesList) {
  moviesList.map((movie) => {
    const movieInfo = {
      img: `https://www.themoviedb.org/t/p/w342` + movie.poster_path,
      title: movie.title,
      link: 'http://google.com',
      addWatchList: 'http://google.com',
      hideIt: 'http://google.com',
      description: movie.overview,
    }
    const { img, title, link, addWatchList, hideIt, description } = movieInfo;

    createCardMovie(img, title, description, addWatchList, hideIt, link, wrapperMovies);
  }) 
}

function createCardMovie(img, title, description, link, addWatchList, hideIt, parent) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardLink = document.createElement('a');
  const cardImage = document.createElement('img');
  cardImage.classList.add('card__image');
  cardImage.src = img;
  cardLink.append(cardImage);

  // CardContent
  const cardContent = document.createElement('div');
  cardContent.classList.add('cardContent');
  const cardContentStatusBar = document.createElement('div');
  cardContentStatusBar.classList.add('cardContent__statusBar');
  cardContent.appendChild(cardContentStatusBar);

  // CardContent__statusBar --> First <a>
  const cardStatusLink = document.createElement('a');
  cardStatusLink.src = link;
  const cardStatusLinkBtn = document.createElement('button');
  const cardStatusLinkBtnIco = document.createElement('i');
  cardStatusLinkBtnIco.className = 'fa fa-play-circle';
  cardStatusLinkBtn.appendChild(cardStatusLinkBtnIco);
  cardStatusLink.appendChild(cardStatusLinkBtn);
  const cardStatusLinkPar = document.createElement('p');
  const cardStatusLinkStrong = document.createElement('strong');
  cardStatusLinkStrong.textContent = 'Riproduci';
  cardStatusLinkPar.appendChild(cardStatusLinkStrong);
  cardStatusLink.appendChild(cardStatusLinkPar);
  cardContentStatusBar.appendChild(cardStatusLink);

  // CardContent__statusBar --> icons <div>
  const iconsRowDiv = document.createElement('div');
  const iconsRowFirst = document.createElement('a');
  iconsRowFirst.src = addWatchList;
  const iconsRowBtnFirst = document.createElement('button');
  const iconsRowBtnFirstIcon = document.createElement('i');
  iconsRowBtnFirstIcon.className = "fa fa-plus";
  iconsRowBtnFirst.appendChild(iconsRowBtnFirstIcon);
  iconsRowFirst.appendChild(iconsRowBtnFirst);
  const iconsRowSecond = document.createElement('a');
  iconsRowSecond.src = hideIt;
  const iconsRowBtnSecond = document.createElement('button');
  const iconsRowBtnSecondIcon = document.createElement('i');
  iconsRowBtnSecondIcon.className = "fa fa-ban";
  iconsRowBtnSecond.appendChild(iconsRowBtnSecondIcon);
  iconsRowSecond.appendChild(iconsRowBtnSecond);
  iconsRowDiv.append(iconsRowFirst, iconsRowSecond);
  cardContentStatusBar.appendChild(iconsRowDiv);

  // CardContent__desc
  const cardContentDesc = document.createElement('div');
  cardContentDesc.classList.add('cardContent__desc');
  const cardContentDescParFirst = document.createElement('p');
  const cardContentDescStrongFirst = document.createElement('strong');
  cardContentDescStrongFirst.textContent = 'Incluso con Prime';
  cardContentDescParFirst.appendChild(cardContentDescStrongFirst);
  const cardContentDescStrongSecond = document.createElement('strong');
  cardContentDescStrongSecond.textContent = title;
  const cardContentDescParSecond = document.createElement('p');
  cardContentDescParSecond.textContent = description;
  cardContentDesc.append(cardContentDescParFirst,
                         cardContentDescStrongSecond,
                         cardContentDescParSecond);
  cardContent.appendChild(cardContentDesc);

  // CardContent__desc
  const cardContentInfo = document.createElement('div');
  cardContentInfo.classList.add('cardContent__info');
  const cardContentInfoFirst = document.createElement('i');
  cardContentInfoFirst.textContent = '2020';
  const cardContentInfoSecond = document.createElement('i');
  cardContentInfoSecond.className = 'fa fa-comment-o';
  const cardContentInfoThird = document.createElement('i');
  cardContentInfoThird.textContent = '16+';
  cardContentInfo.append(cardContentInfoFirst,
                         cardContentInfoSecond,
                         cardContentInfoThird);
  cardContent.appendChild(cardContentInfo);

  card.append(cardLink, cardContent)
  parent.appendChild(card);
}