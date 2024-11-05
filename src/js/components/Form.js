import { Button } from './Button.js'
import { InputSelect } from './InputSelect.js'
import { SearchBar } from './SearchBar.js'

export function Form({ onChangeState, onSubmit }) {
  //create container
  const form = document.createElement('form')
  form.id = 'form'

  //Initial States
  const state = { search: '', searchType: 'name' }

  //function that update the States
  function setState(key, value) {
    state[key] = value
    onChangeState(state)
  }

  // placeholders Object
  const placeholders = {
    name: 'Avengers, Cards, Matrix...',
    year: '1995, 1996, 1997...',
    gender: 'Action, Fiction, Comedy...',
  }

  //handle type of Search
  function handleType({ target }) {
    const value = target.value.toLowerCase()
    setState('searchType', value)

    //Update placeholder of input based on new searchType
    InputElement.placeholder = placeholders[value]
  }

  //handle input Search
  function handleInput({ target }) {
    const value = target.value
    setState('search', value)
  }
  //create Elements
  const InputElement = SearchBar({
    placeholder: placeholders[state.searchType],
    onInput: handleInput,
  })
  const SelectElement = InputSelect({ onType: handleType })
  const ButtonElement = Button({ content: 'Search' })

  //add elements to form container
  form.appendChild(InputElement)
  form.appendChild(SelectElement)
  form.appendChild(ButtonElement)
  //add Event submit
  form.addEventListener('submit', onSubmit)
  //return the from container
  return { form }
}
