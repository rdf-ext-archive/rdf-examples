const rdf = require('rdf-ext')
const formats = require('rdf-formats-common')()
console.log('Normal: ', JSON.stringify(formats, undefined, 2));
const Readable = require('readable-stream')

// create a prefix map and fill it
const prefixMap = rdf.prefixMap({
  ex: rdf.namedNode('http://example.org/')
})

const quad = rdf.quad(
  prefixMap.resolve('ex:subject'),
  prefixMap.resolve('ex:predicate'),
  rdf.literal('object'))

// create a quad stream to feed the serializers
const quadStream = new Readable({
  objectMode: true,
  read: () => {}
})


const serializerJsonLd = formats.serializers[ 'application/ld+json' ];
const serializerTurtle = formats.serializers[ 'text/turtle' ];

// forward the quads to the serializers
const streamJsonLd = serializerJsonLd.import(quadStream)
const streamTurtle = serializerTurtle.import(quadStream)

// pipe the serializer output to stdout
streamJsonLd.pipe(process.stdout)
streamTurtle.pipe(process.stdout)

// forward the prefix map...
prefixMap.export(quadStream)

// ...and the quad
quadStream.push(quad)
quadStream.push(null)


// But if we want to configure a serializer differently than is defined in 'commons', then we need to overwrite the
// instance created by default with our explicitly created and configured instance.
const JsonLdSerializer = require('rdf-serializer-jsonld-ext');
formats.serializers['application/ld+json'] = new JsonLdSerializer( { outputFormat: 'string', compact: true } );

const quadStream2 = new Readable({
    objectMode: true,
    read: () => {}
})

const serializerJsonLd2 = formats.serializers.find('application/ld+json');
const streamJsonLd2 = serializerJsonLd2.import(quadStream2);

// pipe the serializer output to stdout (this time our JSON-LD should be compacted (e.g. the prefix 'ex' is mapped and
// values use it, e.g. 'ex:subject' and 'ex:predicate').
streamJsonLd2.pipe(process.stdout)

// forward the prefix map...
prefixMap.export(quadStream2)

// ...and the quad
quadStream2.push(quad)
quadStream2.push(null)
