const stringToStream = require('string-to-stream')
const JsonLdParser = require('rdf-parser-jsonld')
const NTriplesSerializer = require('rdf-serializer-ntriples')

let example = {
  'http://example.org/predicate': ['object1', 'object2']
}

// create JSON-LD parser instance
let parser = new JsonLdParser()

// forward the JSON-LD example string to the parser
let quadStream = parser.import(stringToStream(JSON.stringify(example)))

// create the N-Triples serializer instance
let serializer = new NTriplesSerializer()

// import the parser stream into the serializer (reverse pipe)
let nTriplesStream = serializer.import(quadStream)

// pipe the N-Triples stream to stdout
nTriplesStream.pipe(process.stdout)
