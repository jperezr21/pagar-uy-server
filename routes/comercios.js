const express = require('express');
const Comercio = require('../models/comercios');

const router = express.Router();

router.get('/', (req, res) => {
  let query = Comercio.find({});
  query.exec(function(err, result) {
    if (!err) {
      res.json(result);
    } else {
      console.log(`Error al obtener comercios:\n${err}`);
      res.status(500).send('Error al obtener comercios');
    }
  });
});

router.post('/', (req, res) => {
  let newComercio = new Comercio(req.body);
  console.log(`Comercio a guardar:\n${newComercio}`);
  newComercio.save(function(err) {
    if (err) {
      console.log(`Error al guardar comercio:\n${err}`);
      res.status(500).send('Error al guardar comercio');
    } else {
      res.end('OK');
    }
  });
});

router.put('/:id', (req, res) => {
  Comercio.findById(req.params.id, function(err, comercio) {
    if (err) {
      console.log(`Error al obtener comercio:\n${err}`);
      res.status(500).send('Error al obtener comercio');
    } else {
      comercio.set(req.body);
      comercio.save(function(err, updatedComercio) {
        if (err) {
          console.log(`Error al actualizar comercio:\n${err}`);
          res.status(500).send('Error al actualizar comercio');
        } else {
          res.json(updatedComercio);
        }
      });
    }
  });
});

module.exports = router;
