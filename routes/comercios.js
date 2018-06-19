const express = require('express');
const Comercio = require('../models/comercios');

const router = express.Router();

router.get('/', (req, res) => {
  let queryConditions = {};
  if (req.query.nombre) {
    queryConditions.nombre = new RegExp(req.query.nombre, 'i');
  }
  if (req.query.direccion) {
    queryConditions.direccion = req.query.direccion;
  }
  if (req.query.coord_x && req.query.coord_y) {
    let coordX = parseFloat(req.query.coord_x);
    let coordY = parseFloat(req.query.coord_y);
    queryConditions.coord_x = { $gt: coordX - 0.05, $lt: coordX + 0.05 };
    queryConditions.coord_y = { $gt: coordY - 0.05, $lt: coordY + 0.05 };
  }
  let query = Comercio.find(queryConditions);
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
      console.log(`Comercio a actualizar:\n${comercio}`);
      comercio.set(req.body);
      comercio.save(function(err, updatedComercio) {
        if (err) {
          console.log(`Error al actualizar comercio:\n${err}`);
          res.status(500).send('Error al actualizar comercio');
        } else {
          console.log(`Comercio actualizado:\n${updatedComercio}`);
          res.json(updatedComercio);
        }
      });
    }
  });
});

module.exports = router;
