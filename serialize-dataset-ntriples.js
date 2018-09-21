const rdf = require('rdf-ext')
const Readable = require('stream').Readable
const SerializerNtriples = require('@rdfjs/serializer-ntriples')

// create a new dataset using the rdf-ext factory
let dataset = rdf.dataset()
let bnode = rdf.blankNode()

dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/givenName'), rdf.literal('Sheldon')))
dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/familyName'), rdf.literal('Cooper')))
dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/address'), bnode))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressCountry'), rdf.literal('US')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressLocality'), rdf.literal('Pasadena')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressRegion'), rdf.literal('CA')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/postalCode'), rdf.literal('91104')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/streetAddress'), rdf.literal('2311 North Los Robles Avenue, Aparment 4A')))


const serializerNtriples = new SerializerNtriples()
const input = dataset.toStream()
const output = serializerNtriples.import(input)

output.on('data', ntriples => {
  console.log(ntriples.toString())
})