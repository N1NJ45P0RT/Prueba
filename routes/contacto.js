const express = require('express');
const { enviarCorreo } = require('../controllers/contactoController');

const router = express.Router();

router.post('/', enviarCorreo);

module.exports = router;
