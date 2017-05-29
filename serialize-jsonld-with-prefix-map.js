const rdf = require('rdf-ext')
const Readable = require('readable-stream')
const JsonLdSerializer = require('rdf-serializer-jsonld-ext')

// create a prefix map and fill it
const prefixMap = rdf.prefixMap({
  ex: rdf.namedNode('http://example.org/')
})

const quad = rdf.quad(
  prefixMap.resolve('ex:subject'),
  prefixMap.resolve('ex:predicate'),
  rdf.literal('object'))

// create a quad stream to feed the serializer
const quadStream = new Readable({
  objectMode: true,
  read: () => {}
})

// create a JSON-LD serializer instance which returns strings and compacts the JSON-LD
const serializer = new JsonLdSerializer({outputFormat: 'string', compact: true})

// forward the quads to the serializer
const jsonStream = serializer.import(quadStream)

// pipe the serializer output to stdout
jsonStream.pipe(process.stdout)

// forward the prefix map...
prefixMap.export(quadStream)

// ...and the quad
quadStream.push(quad)
quadStream.push(null)
