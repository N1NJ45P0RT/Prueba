const express = require('express');
const { obtenerConteos, incrementarConteo } = require('../controllers/descargasController');

const router = express.Router();

// Obtener conteos
router.get('/', obtenerConteos);

// Incrementar conteo
router.post('/', incrementarConteo);

module.exports = router;
