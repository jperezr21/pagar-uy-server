const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const mongoose = require("mongoose");
// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGODB_URI ||
  'mongodb://localhost/HelloMongoose';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var comercioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coord_x: Number,
  coord_y: Number
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
var Comercio = mongoose.model('Comercios', comercioSchema);

// Creating one user.
var abitab = new Comercio({
  nombre: 'Abitab 25-00',
  direccion: 'Av. Gral. Rivera 2406, 11300 Montevideo',
  coord_x: -34.902690,
  coord_y: -56.163212
});

// Saving it to the database.
abitab.save(function(err) {
  if (err) console.log('Error on save!')
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/ok', (req, res) => handleOk(res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handleOk(res) {
  var query = Comercio.find({
    'nombre': 'Abitab 25-00'
  });
  query.exec(function(err, result) {
    if (!err) {
      res.end(JSON.stringify(result, undefined, 2));
    } else {
      res.end('Error in second query. ' + err)
    }
  });
}
