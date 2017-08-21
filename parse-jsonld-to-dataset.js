const rdf = require('rdf-ext')
const stringToStream = require('string-to-stream')
const JsonLdParser = require('rdf-parser-jsonld')

let example = {
  'http://example.org/predicate': ['object1', 'object2']
}

// create JSON-LD parser instance
let parser = new JsonLdParser({factory: rdf})

// forward the JSON-LD example string to the parser
let quadStream = parser.import(stringToStream(JSON.stringify(example)))

// create a new dataset and import the quad stream into it (reverse pipe) with Promise API
rdf.dataset().import(quadStream).then((dataset) => {
  // loop over all quads an write them to the console
  dataset.forEach((quad) => {
    console.log(quad.toString())
  })
})
