import api from './services/api.js'
import { Movie } from './components/Movie.js'
import { Form } from './components/Form.js'
import { NavBar } from './components/navBar.js'
import storage from './services/localStorageService.js'
import { favoritePage } from '../page/favorites.js'
import { watchedListPage } from '../page/watchList.js'
//Elements of the DOM
const listOfGenders = []
const movieListFavorites = storage.get('favorites') || []
const movieListWatched = storage.get('watched') || []
function initApp() {
  // this function get the  updated states
  function onChangeState(state) {}

  const { form } = Form({ onChangeState, onSubmit: handleSubmit })
  const navBar = NavBar({ onLoad: LoadPage })
  const nav = document.getElementById('nav')
  nav.appendChild(navBar)
  nav.appendChild(form)

  //get the genders movies
  api.getListOfGenders().then((res) => listOfGenders.push(...res))

  //render the first list of movies
  renderDefaultMovieList()
}
function LoadPage(page) {
  const main = document.getElementById('root')
  if (!main.querySelector('#title')) {
    const title = document.createElement('h1')
    title.id = 'title'
    main.prepend(title)
  }
  title.textContent = page
  let movies = ''
  if (page === 'favorites') {
    movies = favoritePage()
    const message = 'There are no favorite movies'
    renderMovies(movies, message)
  } else if (page === 'watched') {
    movies = watchedListPage()
    const message = 'There are no watched movies'
    renderMovies(movies, message)
  } else {
    renderDefaultMovieList()
  }
}
let loading = false
async function fetchAndRenderMovies(fetchMovies) {
  const movieLists = document.getElementById('movieLists')
  loading = true
  movieLists.innerHTML = `<h1>Loading movies...</h1>`
  const movies = await fetchMovies
  renderMovies(movies)
}
async function renderDefaultMovieList() {
  renderMovies([], true)
  const movies = await api.loadDefaultMovies()
  renderMovies(movies, false)
}
function renderMovies(movies, message = '') {
  console.log(movies)
  const moviesFragment = document.createDocumentFragment()
  const movieLists = document.getElementById('movieLists')
  movieLists.innerHTML = ''
  if (movies.length > 0) {
    movies.map(({ details, status }) => {
      status.favorite = storage.isInFavorites(details.id)
      status.watched = storage.isInWatched(details.id)
      const movieItem = Movie({ details, status })
      moviesFragment.appendChild(movieItem)
    })
    movieLists.appendChild(moviesFragment)
  } else {
    if (message) {
      movieLists.innerHTML = `<h1>${message}</h1>`
    } else {
      movieLists.innerHTML = `<h1>Movie no found....</h1>`
    }
  }
}
//Search Methods
const searchMovieBy = {
  name: api.getMovieByName.bind(api),
  year: api.getMovieByYear.bind(api),
  gender: api.getMovieByGender.bind(api),
}
//handle submit
function handleSubmit(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  const { search, searchType } = data
  e.target.search.value = ''
  fetchAndRenderMovies(searchMovieBy[searchType](search))
}
export default initApp
