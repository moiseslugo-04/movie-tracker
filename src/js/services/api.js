const BASE_URL = 'https://api.themoviedb.org/'

function mappedMovies(movies) {
  const moviesMapped = movies.map((movie) => {
    return {
      details: {
        id: movie.id,
        title: movie.original_title,
        poster: movie.poster_path,
        overview: movie.overview,
        ranking: movie.vote_average,
        popularity: movie.popularity,
      },
      status: {
        favorite: false,
        watched: false,
      },
    }
  })
  return moviesMapped
}
class Movie {
  constructor(baseURl, API_KEY) {
    this.url = baseURl
    this.API_KEY = API_KEY
    this.options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzBiZjg0ZDc5YWQwYTVkYmMyNTFkNmQwY2NmYzdiMSIsIm5iZiI6MTczMDE4MTk3NS4wOTYwOTMsInN1YiI6IjY1ZjYwM2RmNTk0Yzk0MDE3YzM2NzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SqxQhUjzhlJfx-IwPur6g6CsqL8U2VEaGvqw7RVYVM4',
      },
    }
  }
  async fetchMovies(endPoint, query) {
    try {
      const request = await fetch(
        `${this.url}${endPoint}${query}`,
        this.options
      )
      if (!request.ok) throw new Error('Error getting the movies')
      const { results } = await request.json()
      const movies = mappedMovies(results)
      return movies
    } catch (error) {
      console.log(error)
    }
  }
  async getListOfGenders() {
    const query = '3/genre/movie/list'
    try {
      const request = await fetch(`${this.url}${query}`, this.options)
      if (!request.ok) throw new Error('error getting the genders')
      const { genres } = await request.json()
      return genres
    } catch (error) {
      console.log(error)
    }
  }
  async getMovieByName(name) {
    const endPoint = `3/search/movie?`
    const query = `query=${name}`
    return this.fetchMovies(endPoint, query)
  }
  async getMovieByGender(genderId) {
    const endPoint = `3/discover/movie?&`
    const query = `sort_by=popularity.desc&with_genres=${genderId}`
    return this.fetchMovies(endPoint, query)
  }
  async getMovieByYear(year) {
    const endPoint = `3/discover/movie?&`
    const query = `primary_release_year=${year}&sort_by=popularity.desc`
    return this.fetchMovies(endPoint, query)
  }
  async loadDefaultMovies() {
    const endPoint = `3/movie/popular?`
    const query = `language=en-US&page=1`
    return this.fetchMovies(endPoint, query)
  }
}

const api = new Movie(BASE_URL, '')
export default api
