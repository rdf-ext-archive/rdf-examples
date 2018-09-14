const fs = require('fs')
const rdf = require('rdf-ext')
const N3Parser = require('rdf-parser-n3')

// create N3 parser instance
let parser = new N3Parser({factory: rdf})

// Read a Turtle file and stream it to the parser
let quadStream = parser.import(fs.createReadStream('./node_modules/tbbt-ld/data/person/sheldon-cooper.ttl'))

// create a new dataset and import the quad stream into it (reverse pipe) with Promise API
rdf.dataset().import(quadStream).then((dataset) => {
  // loop over all quads an write them to the console
  dataset.forEach((quad) => {
    console.log(quad.toString())
  })
})
