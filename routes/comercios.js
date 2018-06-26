var passport = require('passport');
require('../config/passport')(passport);
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
    queryConditions.coord_x = {$gt: coordX - 0.05, $lt: coordX + 0.05};
    queryConditions.coord_y = {$gt: coordY - 0.05, $lt: coordY + 0.05};
  }
  let query = Comercio.find(queryConditions);
  query.exec(function (err, result) {
    if (!err) {
      console.log(`Comercios obtenidos:\n${toJSONString(result)}\n`);
      res.json(result);
    } else {
      console.log(`Error al obtener comercios:\n${err}\n`);
      res.status(500).send('Error al obtener comercios');
    }
  });
});

router.get('/:id', (req, res) => {
  Comercio.findById(req.params.id, function (err, comercio) {
    if (err) {
      console.log(`Error al obtener comercio:\n${err}\n`);
      res.status(500).send('Error al obtener comercio');
    } else if (comercio === null) {
      console.log(`Comercio con ID '${req.params.id}' no existe\n`);
      res.status(404).send('Comercio no encontrado');
    } else {
      console.log(`Comercio obtenido:\n${toJSONString(comercio)}\n`);
      res.json(comercio);
    }
  });
});

router.post('/', passport.authenticate('jwt'), function(req, res) {
  let newComercio = new Comercio(req.body);
  console.log(`Comercio a guardar:\n${toJSONString(newComercio)}\n`);
  newComercio.save(function (err) {
    if (err) {
      console.log(`Error al guardar comercio:\n${err}\n`);
      res.status(500).send('Error al guardar comercio');
    } else {
      console.log('Comercio guardado correctamente');
      res.end('OK');
    }
  });
});

router.put('/:id', passport.authenticate('jwt'), function(req, res) {
  Comercio.findById(req.params.id, function (err, comercio) {
    if (err) {
      console.log(`Error al obtener comercio:\n${err}\n`);
      res.status(500).send('Error al obtener comercio');
    } else if (comercio === null) {
      console.log(`Comercio con ID '${req.params.id}' no existe\n`);
      res.status(404).send('Comercio no encontrado');
    } else {
      console.log(`Comercio a actualizar:\n${toJSONString(comercio)}\n`);
      comercio.set(req.body);
      comercio.save(function (err, updatedComercio) {
        if (err) {
          console.log(`Error al actualizar comercio:\n${err}\n`);
          res.status(500).send('Error al actualizar comercio');
        } else {
          console.log(`Comercio actualizado:\n${toJSONString(updatedComercio)}\n`);
          res.json(updatedComercio);
        }
      });
    }
  });
});

router.delete('/:id', passport.authenticate('jwt'), function(req, res) {
  Comercio.findByIdAndDelete(req.params.id, function (err, data) {
    if (err) {
      console.log(`Error al eliminar comercio:\n${err}\n`);
      res.status(500).send('Error al eliminar comercio');
    } else if (data === null) {
      console.log(`Comercio con ID '${req.params.id}' no existe\n`);
      res.status(404).send('Comercio no encontrado');
    } else {
      console.log('Comercio eliminado correctamente');
      res.end('OK');
    }
  });
});

// function checkAuthenticated(req, res, next) {
//   var token = getToken(req.headers);
//   if (token) {
//     next(req, res);
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized'});
//   }
// }
//
// function getToken(headers) {
//   if (headers && headers.authorization) {
//     var parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }

toJSONString = function (obj) {
  return JSON.stringify(obj, undefined, 2);
};

module.exports = router;
