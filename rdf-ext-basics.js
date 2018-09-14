const rdf = require('rdf-ext')

let subject = rdf.namedNode('http://example.org/subject') 
let predicate = rdf.namedNode('http://example.org/predicate')
let object = rdf.literal('object')

let quad = rdf.quad(subject, predicate, object)

// log the triples to console with toString()
// note that this is N-Triples serialization by defiition
console.log(quad.toString())


