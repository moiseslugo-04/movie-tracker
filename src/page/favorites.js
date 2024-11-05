import storage from '../js/services/localStorageService.js'
export function favoritePage(renderMovies) {
  const main = document.getElementById('root')
  const movies = storage.get('favorites')
  console.log(movies)
  return movies
}
