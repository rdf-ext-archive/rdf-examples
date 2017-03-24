const rdf = require('rdf-ext')

let subject = rdf.namedNode('http://example.org/subject')
let predicate = rdf.namedNode('http://example.org/predicate')

let dataset = rdf.dataset([
  rdf.quad(subject, predicate, rdf.literal('default')),
  rdf.quad(subject, predicate, rdf.literal('german', 'de')),
  rdf.quad(subject, predicate, rdf.literal('english', 'en')),
  rdf.quad(rdf.namedNode('http://example.org/subject-other'), predicate, rdf.literal('other'))
])

function findQuadByLanguage (dataset, subject, predicate, languages, graph) {
  languages = Array.isArray(languages) ? languages : []

  if (!languages.includes('')) {
    languages.push('')
  }

  let selected = dataset.match(subject, predicate, null, graph).filter((quad) => {
    return languages.includes(quad.object.language)
  }).toArray().sort((a, b) => {
    return languages.indexOf(a.object.language) - languages.indexOf(b.object.language)
  })

  return selected.shift()
}

console.log(findQuadByLanguage(dataset, subject, predicate, ['fr', 'de']).object.value) // german
console.log(findQuadByLanguage(dataset, subject, predicate, ['en', 'de']).object.value) // english
console.log(findQuadByLanguage(dataset, subject, predicate, ['fr']).object.value) // default
