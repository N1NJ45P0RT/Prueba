// backend_descargas.js
// Backend Node.js para conteo global de descargas y recepción de formularios de contacto

const express = require('express');
const path = require('path');
require('dotenv').config({ path: 'env.env' });

const app = express();
const PORT = 3001;

const descargasRoutes = require('./routes/descargas');
const contactoRoutes = require('./routes/contacto');

app.use(express.json());
app.use(express.static(__dirname));
app.use('/2smr/api/descargas', descargasRoutes);
app.use('/2smr/api/contacto', contactoRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en "ip":${PORT}`);
});
