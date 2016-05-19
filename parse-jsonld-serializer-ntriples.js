'use strict'

const stringToStream = require('string-to-stream')
const JSONLDParser = require('rdf-parser-jsonld')
const NTriplesSerializer = require('rdf-serializer-ntriples')

let example = {
  'http://example.org/predicate': ['object1', 'object2']
}

// create JSON-LD parser instance and forward the JSON-LD example string
let parser = new JSONLDParser(stringToStream(JSON.stringify(example)))

// create the N-Triples serializer instance
let serializer = new NTriplesSerializer()

// import the parser stream into the serializer (reverse pipe)
serializer.import(parser)

// pipe the serializer output to stdout
serializer.pipe(process.stdout)
