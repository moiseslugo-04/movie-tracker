const localStorageService = {
  get(key) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  addToList(key, item) {
    const { id: itemId } = item.details
    const list = this.get(key)
    const exists = list.find(({ details }) => details.id === itemId)
    if (!exists) {
      list.push(item)
      this.save(key, list)
    }
  },
  removeToList(key, item) {
    const { id: itemId } = item.details
    const list = this.get(key)
    const updateList = list.filter(({ details }) => details.id !== itemId)
    this.save(key, updateList)
  },
  isInFavorites(movieId) {
    const favorites = this.get('favorites')
    const movie = favorites.find(({ details }) => details.id === movieId)
    return movie?.status.favorite ?? false
  },
  isInWatched(movieId) {
    console.log(movieId)
    const watched = this.get('watched')
    const movie = watched.find(({ details }) => details.id === movieId)
    return movie?.status.watched ?? false
  },
}

export default localStorageService
