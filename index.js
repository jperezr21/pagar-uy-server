const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan');
const passport = require('passport');

const server = require('./config/server');
const database = require('./config/database');
const comercios = require('./routes/comercios');
const users = require('./routes/users');

// Connect to MongoDB
mongoose.connect(database.uri, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + database.uri + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + database.uri);
  }
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

app.get('/', function(req, res) {
  res.send('Page under construction.');
});
app.use('/comercios', comercios);
app.use('/users', users);

app.listen(server.port, () => console.log(`Listening on ${ server.port }`));
