import storage from '../services/localStorageService.js'
export function Movie({ details, status }) {
  const { id, title, poster, overview, ranking, popularity } = details
  const { favorite, watched } = status
  console.log(status)
  const movie = document.createElement('div')
  movie.classList = 'movie'
  movie.id = id
  const html = `
  <div class='movie-buttons'>
  <span class="material-symbols-outlined 
          btn-favorite ${favorite ? ' active' : ''}">
            bookmark
  </span>
  <span class="material-symbols-outlined 
          btn-watched ${watched ? ' active' : ''}">
            visibility
  </span>
  </div> 
      <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${poster}" alt="${title} Movie Poster">
      <h2 class="movie-title">${title}</h2>
      <div class='movie-details'>
      <p class="movie-Ranking">Ranking: ${ranking}</p>
      <p class="movie-popularity">popularity: ${popularity}</p>
      <p class="movie-overview">${
        overview.length >= 100 ? overview.slice(0, 120) + '...' : overview
      }</p>`
  movie.innerHTML = html
  movie.addEventListener('click', handleClick)
  function handleClick({ target }) {
    target.classList.toggle('active')
    if (target.className.includes('watched')) {
      saveToWatched({ details, status })
    }
    if (target.className.includes('favorite')) {
      saveToFavorites({ details, status })
    }
  }
  function saveToFavorites({ details, status }) {
    status.favorite = !status.favorite
    if (status.favorite) {
      storage.addToList('favorites', { details, status })
    } else {
      storage.removeToList('favorites', { details, status })
    }
  }
  function saveToWatched({ details, status }) {
    status.watched = !status.watched
    if (status.watched) {
      storage.addToList('watched', { details, status })
    } else {
      storage.removeToList('watched', { details, status })
    }
  }
  return movie
}
