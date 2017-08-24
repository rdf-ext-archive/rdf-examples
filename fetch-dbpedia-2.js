const rdf = require('rdf-ext')
const rdfFetch = require('rdf-fetch')

// use the Dataset API to read parts of Amsterdam
rdfFetch('http://dbpedia.org/resource/Amsterdam').then((res) => {
  return res.dataset()
}).then((dataset) => {
  const partQuads = dataset.match(null, rdf.namedNode('http://dbpedia.org/ontology/part'))

  console.log(partQuads.length + ' parts found')

  // convert to array to process none quad results
  return Promise.all(partQuads.toArray().map((partQuad) => {
    return rdfFetch(partQuad.object.toString()).then((res) => {
      return res.dataset()
    }).then((part) => {
      // filter label quad based on predicate and object language
      const labelQuad = part.filter((quad) => {
        return quad.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#label' && quad.object.language === 'en'
      }).toArray().shift()

      // filter population and populationTotal quad
      const populationQuad = part.filter((quad) => {
        return quad.predicate.value === 'http://dbpedia.org/property/population' ||
          quad.predicate.value === 'http://dbpedia.org/ontology/populationTotal'
      }).toArray().shift()

      return {
        label: labelQuad && labelQuad.object.value,
        population: populationQuad && parseFloat(populationQuad.object.value)
      }
    })
  }))
}).then((result) => {
  result = result.filter(i => i.population).sort((a, b) => a.population - b.population)

  console.log(JSON.stringify(result, null, ' '))
}).catch((err) => {
  console.error(err.stack || err.message)
})
