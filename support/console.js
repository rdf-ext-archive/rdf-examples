function escapeHtml (str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function appendText (str) {
  var element = document.getElementById('console');

  element.value = element.value + escapeHtml(str) + '\n';
  element.scrollTop = element.scrollHeight;
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
