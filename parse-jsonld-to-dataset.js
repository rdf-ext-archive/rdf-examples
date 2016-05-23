'use strict'

const rdf = require('rdf-ext')
const stringToStream = require('string-to-stream')
const JSONLDParser = require('rdf-parser-jsonld')

let example = {
  'http://example.org/predicate': ['object1', 'object2']
}

// create JSON-LD parser instance and forward the JSON-LD example string
let parser = new JSONLDParser(stringToStream(JSON.stringify(example)))

// create a new dataset using the rdf-ext factory
let dataset = rdf.dataset()

// import the parser stream into the dataset (reverse pipe) with Promise API
dataset.import(parser).then(() => {

  // loop over all quads an write them to the console
  dataset.forEach((quad) => {
    console.log(quad.toCanonical())
  })
})
