const rdf = require('rdf-ext')
const SparqlStore = require('rdf-store-sparql')

// create a new SPARQL store instance pointing to the dbpedia endpoint
let store = new SparqlStore({
  endpointUrl: 'https://dbpedia.org/sparql'
})

// fetch all triples for the Eiffel Tower subject and opening date predicate
let stream = store.match(
  rdf.namedNode('http://dbpedia.org/resource/Eiffel_Tower'),
  rdf.namedNode('http://dbpedia.org/ontology/openingDate')
)

// forward errors to the console
stream.on('error', (err) => {
  console.error(err.stack || err.message)
})

// write the object value of the matching triple to the console
stream.on('data', (quad) => {
  console.log('The Eiffel Tower opened on: ' + quad.object.value)
})
