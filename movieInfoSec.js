function getMovieModal(bgImage, imgBGMovie, headerMovie, descriptionMovie) {
  const container = document.createElement('div');
  container.classList.add('movieInfo');
  const movieWrapper = document.createElement('div');
  movieWrapper.classList.add('movieInfoWrapper');
  movieWrapper.style.backgroundImage = `url(${bgImage})`;
  // const span = document.createElement('span');
  // span.textContent = '❌';
  // span.classList.add('movieInfoWrapper__closeIcon');
  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('movieInfoWrapper__overlay');
  const img = document.createElement('img');
  img.src = imgBGMovie;

  const infoWrapperContent = document.createElement('div');
  infoWrapperContent.classList.add('movieInfoWrapper__content');
  const header = document.createElement('h2');
  header.textContent = headerMovie;
  const description = document.createElement('p');
  description.textContent = descriptionMovie;

  infoWrapperContent.append(header, description);
  movieWrapper.append(infoWrapper, img, infoWrapperContent);
  container.append(movieWrapper);
  
  document.body.appendChild(container);

  // Close btn
  container.addEventListener('click', (e) => {
    if (e.target === container) container.style.display = 'none';
  })
}

export default getMovieModal;