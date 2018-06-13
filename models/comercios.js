const mongoose = require("mongoose");

var comercioSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  coord_x: Number,
  coord_y: Number
});

var Comercio = mongoose.model('Comercios', comercioSchema);

module.exports = Comercio;
