export function InputSelect({ onType }) {
  //create Container
  const div = document.createElement('div')

  //create Elements
  const label = document.createElement('label')
  const select = document.createElement('select')
  const nameOption = Option({ name: 'name', value: 'Name' })
  const yearOption = Option({ name: 'year', value: 'Year' })
  const genderOption = Option({ name: 'gender', value: 'Gender' })

  //Add content to the elements
  label.textContent = ' Filter by :'
  label.id = 'searchType'

  select.id = 'searchType'
  select.name = 'searchType'

  //default Option
  nameOption.selected = true

  //add Event
  select.addEventListener('change', onType)
  //add Elements to the Select
  select.appendChild(nameOption)
  select.appendChild(yearOption)
  select.appendChild(genderOption)

  //add Elements to the div container
  div.appendChild(label)
  div.appendChild(select)

  return div
}

function Option({ name, value }) {
  const option = document.createElement('option')
  option.value = name
  option.textContent = value
  return option
}
