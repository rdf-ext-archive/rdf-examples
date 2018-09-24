function appendText (str) {
  var element = document.getElementById('console')

  element.value = element.value + str + '\n'
  element.scrollTop = element.scrollHeight
}

console._error = console.error
console._log = console.log

console.error = function (str) {
  appendText(str)
  console._error(str)
}

console.log = function (str) {
  appendText(str)
  console._log(str)
}
