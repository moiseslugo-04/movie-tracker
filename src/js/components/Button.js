export function Button({ content }) {
  const button = document.createElement('button')
  button.textContent = content
  return button
}
