export function SearchBar({ placeholder, onInput }) {
  const input = document.createElement('input')
  input.type = 'text'
  input.id = 'inputSearch'
  input.name = 'search'
  input.placeholder = placeholder
  input.addEventListener('input', onInput)
  return input
}
