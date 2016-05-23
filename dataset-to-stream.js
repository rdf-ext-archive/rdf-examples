'use strict'

const rdf = require('rdf-ext')

// create a new dataset using the rdf-ext factory
let dataset = rdf.dataset()

// add a single quad
dataset.add(rdf.quad(rdf.namedNode('http://example.org/subject'), rdf.namedNode('http://example.org/predicate'),
  rdf.literal('object')))

// create a stream from the dataset
let stream = dataset.toStream()

// log done to console on end event
stream.on('end', () => {
  console.log('done')
})

// log error to console
stream.on('error', (err) => {
  console.error(err.stack || err.message)
})

// log canonical representation for every quad to console
stream.on('data', (quad) => {
  console.log(quad.toCanonical())
})
