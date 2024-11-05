import storage from '../js/services/localStorageService.js'
export function watchedListPage() {
  const main = document.getElementById('root')
  const movies = storage.get('watched')
  console.log(movies)
  return movies
}
