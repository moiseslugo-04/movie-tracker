export function NavBar({ onLoad }) {
  const ul = document.createElement('ul')
  const home = createItemList({ name: 'Home', id: 'home' })
  const favorites = createItemList({ name: 'Favorites', id: 'favorites' })
  const watched = createItemList({ name: 'Watched', id: 'watched' })
  //add Event
  ul.addEventListener('click', handleClick)

  //handle click
  function handleClick({ target }) {
    if (target.id === 'home') {
      onLoad('home')
    } else if (target.id === 'favorites') {
      onLoad('favorites')
    } else if (target.id === 'watched') {
      onLoad('watched')
    }
  }
  ul.appendChild(home)
  ul.appendChild(favorites)
  ul.appendChild(watched)
  return ul
}
function createItemList({ name, id }) {
  //create Elements
  const li = document.createElement('li')
  const a = document.createElement('a')
  //set content
  a.id = id
  a.href = '#'
  a.textContent = name
  li.appendChild(a)
  return li
}
