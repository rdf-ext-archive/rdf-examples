const rdf = require('@rdfjs/data-model')
const rdfExt = require('rdf-ext')
const SparqlStore = require('rdf-store-sparql')

// TODO review this example

let store = new SparqlStore('http://localhost:3030/rdf-store-js/query ', { updateUrl: `http://localhost:3030/rdf-store-js/update` })

// create a new dataset using the rdf-ext factory
let dataset = rdfExt.dataset()
let bnode = rdf.blankNode()

dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/givenName'), rdf.literal('Sheldon')))
dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/familyName'), rdf.literal('Cooper')))
dataset.add(rdf.quad(rdf.namedNode('http://example.org/sheldon'), rdf.namedNode('http://schema.org/address'), bnode))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressCountry'), rdf.literal('US')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressLocality'), rdf.literal('Pasadena')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/addressRegion'), rdf.literal('CA')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/postalCode'), rdf.literal('91104')))
dataset.add(rdf.quad(bnode, rdf.namedNode('http://schema.org/streetAddress'), rdf.literal('2311 North Los Robles Avenue, Aparment 4A')))

// imports the data to the store
store.import(dataset.toStream())

// console.log(dataset.toString())

let otherDataset = rdfExt.dataset()

// otherDataset.import(store.toStream())
