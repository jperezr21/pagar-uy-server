const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./config');
const comercios = require('./routes/comercios');

mongoose.connect(config.db.uri, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + config.db.uri + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + config.db.uri);
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/comercios', comercios);

app.listen(config.port, () => console.log(`Listening on ${ config.port }`));
