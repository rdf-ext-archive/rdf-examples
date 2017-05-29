const rdf = require('rdf-ext')
const stringToStream = require('string-to-stream')
const JsonLdParser = require('rdf-parser-jsonld')

const example = {
  '@context': {
    ex1: 'http://example.org/1',
    ex2: 'http://example.org/2'
  },
  'http://example.org/predicate': ['object1', 'object2']
}

// create JSON-LD parser instance
const parser = new JsonLdParser({factory: rdf})

// forward the JSON-LD example string to the parser
const quadStream = parser.import(stringToStream(JSON.stringify(example)))

// create a prefix map
const prefixes = rdf.prefixMap()

// import the prefixes from the parser
prefixes.import(quadStream).then((prefixes) => {
  console.log(JSON.stringify(prefixes.map, null, ' '))
})

// process the stream
quadStream.resume()
